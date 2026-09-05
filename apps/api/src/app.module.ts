import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CarrerasModule } from './carreras/carreras.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SemestresModule } from './semestres/semestres.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ProfesoresService } from './profesores/profesores.service';
import { ProfesoresModule } from './profesores/profesores.module';

@Module({
  imports: [
    UsuariosModule,
    RolesModule,
    EstudiantesModule,
    AuthModule,
    CarrerasModule,
    SemestresModule,
    ProfesoresModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    ProfesoresService,
  ],
})
export class AppModule {}