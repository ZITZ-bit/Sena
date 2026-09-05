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
import { MateriasService } from './materias/materias.service';
import { MateriasModule } from './materias/materias.module';

@Module({
  imports: [
    UsuariosModule,
    RolesModule,
    EstudiantesModule,
    AuthModule,
    CarrerasModule,
    SemestresModule,
    ProfesoresModule,
    MateriasModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    ProfesoresService,
    MateriasService,
  ],
})
export class AppModule {}