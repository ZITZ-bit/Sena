import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';

import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolesService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly usuariosService: UsuariosService,
  ) {}

  // Crear rol
  async create(
    createRolDto: CreateRolDto,
  ) {

    const rolExistente = await this.prisma.roles.findUnique({
      where: {
        nombre: createRolDto.nombre,
      },
    });

    if (rolExistente) {
      throw new BadRequestException(
        'El rol ya está registrado.',
      );
    }

    return this.prisma.roles.create({
      data: createRolDto,
    });

  }

  // Obtener todos los roles
  async findAll() {

    return this.prisma.roles.findMany();

  }

  // Buscar un rol por ID
  async findOne(id: number) {

    const rol = await this.prisma.roles.findUnique({
      where: {
        id,
      },
    });

    if (!rol) {
      throw new NotFoundException(
        'Rol no encontrado.',
      );
    }

    return rol;
  }

  // Buscar un rol por nombre
  async findByName(nombre: string) {

    const rol = await this.prisma.roles.findUnique({
      where: {
        nombre,
      },
    });

    if (!rol) {
      throw new NotFoundException(
        'Rol no encontrado.',
      );
    }

    return rol;
  }

  // Asignar un rol a un usuario
  async assignRole(
    usuarioId: number,
    rolId: number,
  ) {

    await this.usuariosService.findOne(usuarioId);

    await this.findOne(rolId);

    const existe = await this.prisma.usuario_roles.findUnique({
      where: {
        usuario_id_rol_id: {
          usuario_id: usuarioId,
          rol_id: rolId,
        },
      },
    });

    if (existe) {
      throw new BadRequestException(
        'El usuario ya tiene asignado este rol.',
      );
    }

    return this.prisma.usuario_roles.create({
      data: {
        usuario_id: usuarioId,
        rol_id: rolId,
      },
    });
  }

  // Quitar un rol a un usuario
  async removeRole(
    usuarioId: number,
    rolId: number,
  ) {

    return this.prisma.usuario_roles.delete({
      where: {
        usuario_id_rol_id: {
          usuario_id: usuarioId,
          rol_id: rolId,
        },
      },
    });
  }

  // Obtener todos los roles de un usuario
  async getUserRoles(usuarioId: number) {

    await this.usuariosService.findOne(usuarioId);

    return this.prisma.usuario_roles.findMany({
      where: {
        usuario_id: usuarioId,
      },
      include: {
        roles: true,
      },
    });
  }

}