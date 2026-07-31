import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';

import { CarrerasService } from './carreras.service';

import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Controller('carreras')
export class CarrerasController {

  constructor(
    private readonly carrerasService: CarrerasService,
  ) {}

  // Crear carrera
  @Post()
  create(
    @Body() createCarreraDto: CreateCarreraDto,
  ) {
    return this.carrerasService.create(createCarreraDto);
  }

  // Obtener todas las carreras
  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }

  // Buscar una carrera por ID
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.carrerasService.findOne(+id);
  }

  // Actualizar una carrera
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarreraDto: UpdateCarreraDto,
  ) {
    return this.carrerasService.update(
      +id,
      updateCarreraDto,
    );
  }

  // Eliminar una carrera
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.carrerasService.remove(+id);
  }

}