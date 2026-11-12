import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller('asignaciones')
export class AsignacionesController {
  constructor(private readonly asignacionesService: AsignacionesService) {}

  @Get()
  findAll() {
    return this.asignacionesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignacionesService.remove(+id);
  }
}
