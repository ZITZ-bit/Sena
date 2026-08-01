import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';

@Injectable()
export class SemestresService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Crear semestre
  async create(
    createSemestreDto: CreateSemestreDto,
  ) {

    const semestreExistente = await this.prisma.semestres.findFirst({

      where: {
        nombre: createSemestreDto.nombre,
      },

    });

    if (semestreExistente) {
      throw new BadRequestException(
        'El semestre ya está registrado.',
      );
    }

    return this.prisma.semestres.create({

      data: createSemestreDto,

    });

  }

  // Obtener todos los semestres
  async findAll() {

    return this.prisma.semestres.findMany();

  }

  // Buscar un semestre por ID
  async findOne(
    id: number,
  ) {

    const semestre = await this.prisma.semestres.findUnique({

      where: {
        id,
      },

    });

    if (!semestre) {
      throw new NotFoundException(
        'Semestre no encontrado.',
      );
    }

    return semestre;

  }

  // Actualizar semestre
  async update(
    id: number,
    updateSemestreDto: UpdateSemestreDto,
  ) {

    await this.findOne(id);

    return this.prisma.semestres.update({

      where: {
        id,
      },

      data: updateSemestreDto,

    });

  }

  // Eliminar semestre
  async remove(
    id: number,
  ) {

    await this.findOne(id);

    return this.prisma.semestres.delete({

      where: {
        id,
      },

    });

  }

}