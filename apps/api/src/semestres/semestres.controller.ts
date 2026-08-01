import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';

import { SemestresService } from './semestres.service';

import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';

@Controller('semestres')
export class SemestresController {

  constructor(
    private readonly semestresService: SemestresService,
  ) {}

  // Crear semestre
  @Post()
  create(
    @Body() createSemestreDto: CreateSemestreDto,
  ) {
    return this.semestresService.create(createSemestreDto);
  }

  // Obtener todos los semestres
  @Get()
  findAll() {
    return this.semestresService.findAll();
  }

  // Buscar un semestre por ID
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.semestresService.findOne(+id);
  }

  // Actualizar semestre
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSemestreDto: UpdateSemestreDto,
  ) {
    return this.semestresService.update(
      +id,
      updateSemestreDto,
    );
  }

  // Eliminar semestre
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.semestresService.remove(+id);
  }

}