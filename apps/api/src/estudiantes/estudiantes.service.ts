import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';

import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  private readonly logger = new Logger(EstudiantesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly usuariosService: UsuariosService,
  ) {}

  // Registrar estudiante
  async create(createEstudianteDto: CreateEstudianteDto) {
    const {
      cedula,
      nombre,
      apellido,
      correo,
      fecha_nacimiento,
      telefono,
      direccion,
      semestre_id,
      carrera_id,
    } = createEstudianteDto;

    // FormData envía estos valores como String,
    // pero Prisma necesita Int
    const semestreId = semestre_id ? Number(semestre_id) : null;

    const carreraId = carrera_id ? Number(carrera_id) : null;

    const fechaNacimiento = fecha_nacimiento
      ? new Date(fecha_nacimiento)
      : null;

    if (!fechaNacimiento || Number.isNaN(fechaNacimiento.getTime())) {
      throw new BadRequestException('La fecha de nacimiento es inválida.');
    }

    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const temporaryPassword = randomBytes(48).toString('hex');
    let activationUrl: string;

    try {
      const configuredStudentAppUrl =
        process.env.STUDENT_APP_URL ||
        (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3003');
      if (!configuredStudentAppUrl) {
        throw new Error('STUDENT_APP_URL is required in production.');
      }

      const studentAppUrl = new URL(configuredStudentAppUrl);
      if (!['http:', 'https:'].includes(studentAppUrl.protocol)) {
        throw new Error('STUDENT_APP_URL must use HTTP or HTTPS.');
      }

      studentAppUrl.pathname = '/ui/ActivarCuenta';
      studentAppUrl.search = '';
      studentAppUrl.hash = '';
      studentAppUrl.searchParams.set('token', rawToken);
      activationUrl = studentAppUrl.toString();
    } catch {
      throw new BadRequestException(
        'STUDENT_APP_URL no tiene una URL válida para el enlace de activación.',
      );
    }

    const createdStudent = await this.prisma.$transaction(async (tx) => {
      // Verificar si la cédula ya existe
      const usuarioExistente = await tx.usuarios.findUnique({
        where: {
          cedula,
        },
      });

      if (usuarioExistente) {
        throw new ConflictException('La cédula ya está registrada.');
      }

      // Verificar si el correo ya existe
      const estudianteExistente = await tx.estudiantes.findUnique({
        where: {
          correo,
        },
      });

      if (estudianteExistente) {
        throw new ConflictException('El correo ya está registrado.');
      }

      // Crear usuario
      const usuario = await tx.usuarios.create({
        data: {
          cedula,
          password: temporaryPassword,
          estado: false,
        },
      });

      // Crear estudiante
      const estudiante = await tx.estudiantes.create({
        data: {
          nombre,
          apellido,
          correo,
          fecha_nacimiento: fechaNacimiento,
          telefono,
          direccion,
          usuario_id: usuario.id,
          semestre_id: semestreId,
          carrera_id: carreraId,
        },
      });

      // Buscar el rol Estudiante
      const rolEstudiante = await tx.roles.findUnique({
        where: {
          nombre: 'Estudiante',
        },
      });

      if (!rolEstudiante) {
        throw new NotFoundException('El rol Estudiante no existe.');
      }

      // Asignar rol Estudiante al usuario
      await tx.usuario_roles.create({
        data: {
          usuario_id: usuario.id,
          rol_id: rolEstudiante.id,
        },
      });

      await tx.activation_tokens.create({
        data: {
          token_hash: tokenHash,
          usuario_id: usuario.id,
          expires_at: tokenExpiresAt,
        },
      });

      return {
        id: usuario.id,
        email: estudiante.correo,
        fullName: `${estudiante.nombre} ${estudiante.apellido}`,
      };
    });

    return {
      message:
        'Estudiante registrado. Copia el enlace de activación y envíaselo al estudiante para que lo pegue en la URL de activación.',
      activationUrl,
      token: rawToken,
      email: createdStudent.email,
      fullName: createdStudent.fullName,
    };
  }

  // Obtener todos los estudiantes
  async findAll() {
    return this.prisma.estudiantes.findMany({
      include: {
        carreras: true,
        semestres: true,
        usuarios: {
          select: {
            id: true,
            cedula: true,
            estado: true,
          },
        },
      },
    });
  }

  // Buscar estudiante por ID
  async findOne(id: number) {
    const estudiante = await this.prisma.estudiantes.findUnique({
      where: {
        id,
      },
      include: {
        carreras: true,
        semestres: true,
        usuarios: {
          select: {
            id: true,
            cedula: true,
            estado: true,
          },
        },
      },
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

    return estudiante;
  }

  // Actualizar estudiante
  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    await this.findOne(id);

    return this.prisma.estudiantes.update({
      where: {
        id,
      },
      data: updateEstudianteDto,
    });
  }

  // Desactivar estudiante
  async disable(id: number) {
    const estudiante = await this.findOne(id);

    return this.usuariosService.disableUser(estudiante.usuario_id);
  }

  // Eliminar estudiante
  async remove(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const estudiante = await tx.estudiantes.findUnique({
        where: {
          id,
        },
      });

      if (!estudiante) {
        throw new NotFoundException('Estudiante no encontrado.');
      }

      // Eliminar roles del usuario
      await tx.usuario_roles.deleteMany({
        where: {
          usuario_id: estudiante.usuario_id,
        },
      });

      // Eliminar estudiante
      await tx.estudiantes.delete({
        where: {
          id,
        },
      });

      // Eliminar usuario
      await tx.usuarios.delete({
        where: {
          id: estudiante.usuario_id,
        },
      });

      return {
        message: 'Estudiante eliminado correctamente.',
      };
    });
  }
}
