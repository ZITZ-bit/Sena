import { Module } from '@nestjs/common';
import { MateriasController } from './materias.controller';

@Module({
  controllers: [MateriasController]
})
export class MateriasModule {}
