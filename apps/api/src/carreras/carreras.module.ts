import { Module } from '@nestjs/common';

import { CarrerasController } from './carreras.controller';
import { CarrerasService } from './carreras.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    CarrerasController,
  ],
  providers: [
    CarrerasService,
  ],
  exports: [
    CarrerasService,
  ],
})

export class CarrerasModule {}
