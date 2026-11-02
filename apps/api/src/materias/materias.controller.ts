import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { MateriasService } from './materias.service';

import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @Get()
  findAll() {
    return this.materiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiasService.update(+id, updateMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiasService.remove(+id);
  }
}
