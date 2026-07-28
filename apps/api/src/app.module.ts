import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsuariosModule,
    RolesModule,
    EstudiantesModule,
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}