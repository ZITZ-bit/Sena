import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsuariosService } from '../usuarios/usuarios.service';
import { RolesService } from '../roles/roles.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly rolesService: RolesService,
  ) {}

  async login(loginDto: LoginDto) {

    const usuario = await this.usuariosService.findByCedula(
      loginDto.cedula,
    );

    if (!usuario) {
      throw new UnauthorizedException(
        'Cédula o contraseña incorrecta.',
      );
    }

    if (!usuario.estado) {
      throw new UnauthorizedException(
        'El usuario está deshabilitado.',
      );
    }

    // Aquí luego compararemos con bcrypt
    if (usuario.password !== loginDto.password) {
      throw new UnauthorizedException(
        'Cédula o contraseña incorrecta.',
      );
    }

    const roles = await this.rolesService.getUserRoles(
      usuario.id,
    );

    return {
      message: 'Inicio de sesión exitoso.',
      usuario: {
        id: usuario.id,
        cedula: usuario.cedula,
        estado: usuario.estado,
        roles: roles.map((r) => r.roles.nombre),
      },
    };

  }

}