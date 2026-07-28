import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';

import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {

  constructor(
    private readonly estudiantesService: EstudiantesService,
  ) {}

  // Registrar estudiante
  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto,) {
    return this.estudiantesService.create(createEstudianteDto);
  }

  // Obtener todos los estudiantes
  @Get()
  findAll() {
    return this.estudiantesService.findAll();
  }

  // Buscar un estudiante por ID
  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.estudiantesService.findOne(+id);
  }

  // Actualizar estudiante
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateEstudianteDto,) {
    return this.estudiantesService.update(+id, updateEstudianteDto,);
  }

  // Eliminar estudiante
  @Delete(':id')
  disable(@Param('id') id: string,) {
    return this.estudiantesService.disable(+id);
  }

}