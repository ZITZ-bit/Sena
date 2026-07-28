import { Module } from '@nestjs/common';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

import { UsuariosModule } from '../usuarios/usuarios.module';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
  ],
  controllers: [
    RolesController,
  ],
  providers: [
    RolesService,
  ],
  exports: [
    RolesService,
  ],
})
export class RolesModule {}