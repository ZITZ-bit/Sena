import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import type { Multer } from 'multer';

import { PrismaService } from '../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';

import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usuariosService: UsuariosService,
  ) {}

  // Registrar estudiante
  async create(
    createEstudianteDto: CreateEstudianteDto,
    foto?: Multer.File,
  ) {
    const {
      cedula,
      password,
      nombre,
      apellido,
      correo,
      fecha_nacimiento,
      telefono,
      direccion,
      foto_perfil,
      semestre_id,
      carrera_id,
    } = createEstudianteDto;

    // Ruta de la imagen guardada por Multer
    const fotoPerfil = foto
      ? `/uploads/perfiles/${foto.filename}`
      : foto_perfil ?? null;

    // FormData envía estos valores como String,
    // pero Prisma necesita Int
    const semestreId = semestre_id
      ? Number(semestre_id)
      : null;

    const carreraId = carrera_id
      ? Number(carrera_id)
      : null;

    const fechaNacimiento = fecha_nacimiento
      ? new Date(fecha_nacimiento)
      : null;

    if (!fechaNacimiento || Number.isNaN(fechaNacimiento.getTime())) {
      throw new BadRequestException(
        'La fecha de nacimiento es inválida.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // Verificar si la cédula ya existe
      const usuarioExistente = await tx.usuarios.findUnique({
        where: {
          cedula,
        },
      });

      if (usuarioExistente) {
        throw new ConflictException(
          'La cédula ya está registrada.',
        );
      }

      // Verificar si el correo ya existe
      const estudianteExistente =
        await tx.estudiantes.findUnique({
          where: {
            correo,
          },
        });

      if (estudianteExistente) {
        throw new ConflictException(
          'El correo ya está registrado.',
        );
      }

      // Crear usuario
      const usuario = await tx.usuarios.create({
        data: {
          cedula,
          password,
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
          foto_perfil: fotoPerfil,
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
        throw new NotFoundException(
          'El rol Estudiante no existe.',
        );
      }

      // Asignar rol Estudiante al usuario
      await tx.usuario_roles.create({
        data: {
          usuario_id: usuario.id,
          rol_id: rolEstudiante.id,
        },
      });

      return {
        message: 'Estudiante registrado correctamente.',
        estudiante,
        usuario: {
          id: usuario.id,
          cedula: usuario.cedula,
          estado: usuario.estado,
        },
        rol: rolEstudiante.nombre,
      };
    });
  }

  // Obtener todos los estudiantes
  async findAll() {
    return this.prisma.estudiantes.findMany({
      include: {
        carreras: true,
        semestres: true,
        usuarios: true,
      },
    });
  }

  // Buscar estudiante por ID
  async findOne(id: number) {
    const estudiante =
      await this.prisma.estudiantes.findUnique({
        where: {
          id,
        },
        include: {
          carreras: true,
          semestres: true,
          usuarios: true,
        },
      });

    if (!estudiante) {
      throw new NotFoundException(
        'Estudiante no encontrado.',
      );
    }

    return estudiante;
  }

  // Actualizar estudiante
  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ) {
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

    return this.usuariosService.disableUser(
      estudiante.usuario_id,
    );
  }

  // Eliminar estudiante
  async remove(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const estudiante =
        await tx.estudiantes.findUnique({
          where: {
            id,
          },
        });

      if (!estudiante) {
        throw new NotFoundException(
          'Estudiante no encontrado.',
        );
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
