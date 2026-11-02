import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { SeccionesService } from './secciones.service';

import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';

@Controller('secciones')
export class SeccionesController {
  constructor(private readonly seccionesService: SeccionesService) {}

  @Post()
  create(@Body() createSeccionDto: CreateSeccionDto) {
    return this.seccionesService.create(createSeccionDto);
  }

  @Get()
  findAll() {
    return this.seccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeccionDto: UpdateSeccionDto) {
    return this.seccionesService.update(+id, updateSeccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seccionesService.remove(+id);
  }
}
