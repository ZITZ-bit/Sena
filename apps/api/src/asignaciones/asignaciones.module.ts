import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AsignacionesController } from './asignaciones.controller';
import { AsignacionesService } from './asignaciones.service';

@Module({
  imports: [PrismaModule],
  controllers: [AsignacionesController],
  providers: [AsignacionesService],
})
export class AsignacionesModule {}
