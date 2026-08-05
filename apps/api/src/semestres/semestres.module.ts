import { Module } from '@nestjs/common';

import { SemestresController } from './semestres.controller';
import { SemestresService } from './semestres.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    SemestresController,
  ],
  providers: [
    SemestresService,
  ],
  exports: [
    SemestresService,
  ],
})

export class SemestresModule {}
