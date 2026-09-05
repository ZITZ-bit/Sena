import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfesorDto: CreateProfesorDto) {
    const {
      cedula,
      password,
      nombre,
      apellido,
      correo,
      fecha_nacimiento,
      telefono,
      direccion,
    } = createProfesorDto;

    const fechaNacimiento = new Date(fecha_nacimiento);

    if (Number.isNaN(fechaNacimiento.getTime())) {
      throw new BadRequestException(
        'La fecha de nacimiento es inválida.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // Verificar cédula
      const usuarioExistente = await tx.usuarios.findUnique({
        where: { cedula },
      });

      if (usuarioExistente) {
        throw new ConflictException(
          'La cédula ya está registrada.',
        );
      }

      // Verificar correo
      const profesorExistente =
        await tx.profesores.findUnique({
          where: { correo },
        });

      if (profesorExistente) {
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

      // Crear profesor
      const profesor = await tx.profesores.create({
        data: {
          nombre,
          apellido,
          correo,
          fecha_nacimiento: fechaNacimiento,
          telefono,
          direccion,
          usuario_id: usuario.id,
        },
      });

      // Buscar rol Profesor
      const rolProfesor = await tx.roles.findUnique({
        where: { nombre: 'Profesor' },
      });

      if (!rolProfesor) {
        throw new NotFoundException(
          'El rol Profesor no existe.',
        );
      }

      // Asignar rol al usuario
      await tx.usuario_roles.create({
        data: {
          usuario_id: usuario.id,
          rol_id: rolProfesor.id,
        },
      });

      return {
        message: 'Profesor registrado correctamente.',
        profesor,
        usuario: {
          id: usuario.id,
          cedula: usuario.cedula,
          estado: usuario.estado,
        },
        rol: rolProfesor.nombre,
      };
    });
  }

  async findAll() {
    return this.prisma.profesores.findMany({
      include: {
        usuarios: true,
      },
    });
  }

  async findOne(id: number) {
    const profesor = await this.prisma.profesores.findUnique({
      where: { id },
      include: {
        usuarios: true,
      },
    });

    if (!profesor) {
      throw new NotFoundException(
        'Profesor no encontrado.',
      );
    }

    return profesor;
  }

  async update(
    id: number,
    updateProfesorDto: UpdateProfesorDto,
  ) {
    const profesor = await this.findOne(id);

    const {
      cedula,
      password,
      nombre,
      apellido,
      correo,
      fecha_nacimiento,
      telefono,
      direccion,
    } = updateProfesorDto;

    return this.prisma.$transaction(async (tx) => {
      // Actualizar datos de usuarios
      if (cedula !== undefined || password !== undefined) {
        await tx.usuarios.update({
          where: {
            id: profesor.usuario_id,
          },
          data: {
            ...(cedula !== undefined && { cedula }),
            ...(password !== undefined && { password }),
          },
        });
      }

      // Preparar datos del profesor
      const datosProfesor: any = {
        ...(nombre !== undefined && { nombre }),
        ...(apellido !== undefined && { apellido }),
        ...(correo !== undefined && { correo }),
        ...(telefono !== undefined && { telefono }),
        ...(direccion !== undefined && { direccion }),
      };

      if (fecha_nacimiento !== undefined) {
        const fechaNacimiento = new Date(fecha_nacimiento);

        if (Number.isNaN(fechaNacimiento.getTime())) {
          throw new BadRequestException(
            'La fecha de nacimiento es inválida.',
          );
        }

        datosProfesor.fecha_nacimiento = fechaNacimiento;
      }

      // Actualizar profesor
      const profesorActualizado =
        await tx.profesores.update({
          where: { id },
          data: datosProfesor,
        });

      return {
        message: 'Profesor actualizado correctamente.',
        profesor: profesorActualizado,
      };
    });
  }

  async remove(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const profesor = await tx.profesores.findUnique({
        where: { id },
      });

      if (!profesor) {
        throw new NotFoundException(
          'Profesor no encontrado.',
        );
      }

      // Eliminar roles del usuario
      await tx.usuario_roles.deleteMany({
        where: {
          usuario_id: profesor.usuario_id,
        },
      });

      // Eliminar profesor
      await tx.profesores.delete({
        where: { id },
      });

      // Eliminar usuario
      await tx.usuarios.delete({
        where: {
          id: profesor.usuario_id,
        },
      });

      return {
        message: 'Profesor eliminado correctamente.',
      };
    });
  }
}