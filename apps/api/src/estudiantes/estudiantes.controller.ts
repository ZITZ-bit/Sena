import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import type { Multer } from 'multer';

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
  @UseInterceptors(
    FileInterceptor('foto_perfil', {
      storage: diskStorage({
        destination: './uploads/perfiles',

        filename: (_req, file, callback) => {
          const extension = extname(
            file.originalname,
          );

          const nombreArchivo =
            `foto-${Date.now()}${extension}`;

          callback(
            null,
            nombreArchivo,
          );
        },
      }),
    }),
  )
  create(
    @Body()
    createEstudianteDto: CreateEstudianteDto,

    @UploadedFile()
    foto?: Multer.File,
  ) {
    return this.estudiantesService.create(
      createEstudianteDto,
      foto,
    );
  }

  // Obtener todos los estudiantes
  @Get()
  findAll() {
    return this.estudiantesService.findAll();
  }

  // Buscar estudiante por ID
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.estudiantesService.findOne(
      +id,
    );
  }

  // Actualizar estudiante
  @Patch(':id')
  update(
    @Param('id') id: string,

    @Body()
    updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudiantesService.update(
      +id,
      updateEstudianteDto,
    );
  }

  // Eliminar estudiante
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.estudiantesService.remove(
      +id,
    );
  }
}
