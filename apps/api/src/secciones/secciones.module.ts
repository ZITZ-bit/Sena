import { Module } from '@nestjs/common';

import { SeccionesController } from './secciones.controller';
import { SeccionesService } from './secciones.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SeccionesController],
  providers: [SeccionesService],
  exports: [SeccionesService],
})
export class SeccionesModule {}
