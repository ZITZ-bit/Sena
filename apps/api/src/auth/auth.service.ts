import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash } from 'node:crypto';

import { UsuariosService } from '../usuarios/usuarios.service';
import { RolesService } from '../roles/roles.service';
import { PrismaService } from '../prisma/prisma.service';

import { ActivateAccountDto } from './dto/activate-account.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly rolesService: RolesService,
    private readonly prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario = await this.usuariosService.findByCedula(loginDto.cedula);

    if (!usuario) {
      throw new UnauthorizedException('Cédula o contraseña incorrecta.');
    }

    if (!usuario.estado) {
      throw new UnauthorizedException(
        'Debes activar tu cuenta desde el enlace enviado a tu correo.',
      );
    }

    // Aquí luego compararemos con bcrypt
    if (usuario.password !== loginDto.password) {
      throw new UnauthorizedException('Cédula o contraseña incorrecta.');
    }

    const roles = await this.rolesService.getUserRoles(usuario.id);

    return {
      message: 'Inicio de sesión exitoso.',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        cedula: usuario.cedula,
        estado: usuario.estado,
        roles: roles.map((r) => r.roles.nombre),
      },
    };
  }

  async getActivationDetails(token: string) {
    const tokenHash = this.hashActivationToken(token);
    const activation = await this.prisma.activation_tokens.findUnique({
      where: { token_hash: tokenHash },
      include: {
        usuarios: {
          select: {
            cedula: true,
            estado: true,
            estudiantes: {
              select: {
                nombre: true,
                apellido: true,
              },
            },
          },
        },
      },
    });

    if (
      !activation ||
      activation.expires_at <= new Date() ||
      activation.usuarios.estado !== false ||
      !activation.usuarios.estudiantes
    ) {
      throw new BadRequestException(
        'El enlace de activación no es válido o ya venció.',
      );
    }

    return {
      cedula: activation.usuarios.cedula,
      nombre: `${activation.usuarios.estudiantes.nombre} ${activation.usuarios.estudiantes.apellido}`,
    };
  }

  async activateAccount({ token, password }: ActivateAccountDto) {
    if (
      typeof password !== 'string' ||
      password.length < 8 ||
      password.length > 128
    ) {
      throw new BadRequestException(
        'La contraseña debe tener entre 8 y 128 caracteres.',
      );
    }

    const tokenHash = this.hashActivationToken(token);
    const now = new Date();

    await this.prisma.$transaction(async (tx) => {
      const activation = await tx.activation_tokens.findUnique({
        where: { token_hash: tokenHash },
      });

      if (!activation || activation.expires_at <= now) {
        throw new BadRequestException(
          'El enlace de activación no es válido o ya venció.',
        );
      }

      const consumed = await tx.activation_tokens.deleteMany({
        where: {
          token_hash: tokenHash,
          expires_at: { gt: now },
        },
      });

      if (consumed.count !== 1) {
        throw new BadRequestException(
          'El enlace de activación ya fue utilizado.',
        );
      }

      await tx.usuarios.update({
        where: { id: activation.usuario_id },
        data: {
          password,
          estado: true,
        },
      });
    });

    return {
      message: 'Tu cuenta fue activada. Ya puedes iniciar sesión.',
    };
  }

  private hashActivationToken(token: string): string {
    if (!/^[a-f0-9]{64}$/.test(token)) {
      throw new BadRequestException(
        'El enlace de activación no es válido o ya venció.',
      );
    }

    return createHash('sha256').update(token).digest('hex');
  }
}
