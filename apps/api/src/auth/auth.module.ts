import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PrismaModule } from '../prisma/prisma.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    RolesModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}