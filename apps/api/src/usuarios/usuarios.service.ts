import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear usuario
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.prisma.usuarios.findUnique({
      where: {
        cedula: createUsuarioDto.cedula,
      },
    });

    if (usuarioExistente) {
      throw new Error('La cédula ya está registrada');
    }

    return this.prisma.usuarios.create({
      data: {
        cedula: createUsuarioDto.cedula,
        password: createUsuarioDto.password,
      },
    });
  }

  // Obtener todos
  async findAll() {
    return this.prisma.usuarios.findMany({
      select: {
        id: true,
        nombre: true,
        cedula: true,
        estado: true,
        created_at: true,
        usuario_roles: {
          select: {
            roles: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
        estudiantes: {
          select: {
            nombre: true,
            apellido: true,
          },
        },
        profesores: {
          select: {
            nombre: true,
            apellido: true,
          },
        },
      },
    });
  }

  // Buscar por ID
  async findOne(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nombre: true,
        cedula: true,
        estado: true,
        created_at: true,
        usuario_roles: {
          select: {
            roles: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  // Buscar por cédula (LOGIN)
  async findByCedula(cedula: string) {
    return this.prisma.usuarios.findUnique({
      where: {
        cedula,
      },
    });
  }

  // Actualizar usuario
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    return this.prisma.usuarios.update({
      where: {
        id,
      },

      data: updateUsuarioDto,
    });
  }

  // Desactivar usuario
  async disableUser(id: number) {
    await this.findOne(id);

    return this.prisma.usuarios.update({
      where: {
        id,
      },

      data: {
        estado: false,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.usuarios.delete({ where: { id } });

    return { message: 'Usuario eliminado correctamente.' };
  }
}
