import { Module } from '@nestjs/common';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';

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
    EstudiantesController,
  ],
  providers: [
    EstudiantesService,
  ],
  exports: [
    EstudiantesService,
  ],
})
export class EstudiantesModule {}