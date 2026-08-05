import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

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
  async create(createEstudianteDto: CreateEstudianteDto) {

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
      const estudianteExistente = await tx.estudiantes.findUnique({
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
          fecha_nacimiento: new Date(fecha_nacimiento),
          telefono,
          direccion,
          foto_perfil,
          usuario_id: usuario.id,
          semestre_id,
          carrera_id,
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

    const estudiante = await this.prisma.estudiantes.findUnique({

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

}