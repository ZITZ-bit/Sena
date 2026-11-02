import { Module } from '@nestjs/common';

import { MateriasController } from './materias.controller';
import { MateriasService } from './materias.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MateriasController],
  providers: [MateriasService],
  exports: [MateriasService],
})
export class MateriasModule {}
