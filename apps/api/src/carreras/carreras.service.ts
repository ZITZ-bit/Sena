import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarrerasService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Crear carrera
  async create(
    createCarreraDto: CreateCarreraDto,
  ) {

    const carreraExistente = await this.prisma.carreras.findFirst({

      where: {
        nombre: createCarreraDto.nombre,
      },

    });

    if (carreraExistente) {
      throw new BadRequestException(
        'La carrera ya está registrada.',
      );
    }

    return this.prisma.carreras.create({

      data: createCarreraDto,

    });

  }

  // Obtener todas las carreras
  async findAll() {

    return this.prisma.carreras.findMany();

  }

  // Buscar una carrera por ID
  async findOne(
    id: number,
  ) {

    const carrera = await this.prisma.carreras.findUnique({

      where: {
        id,
      },

    });

    if (!carrera) {
      throw new NotFoundException(
        'Carrera no encontrada.',
      );
    }

    return carrera;

  }

  // Actualizar carrera
  async update(
    id: number,
    updateCarreraDto: UpdateCarreraDto,
  ) {

    await this.findOne(id);

    return this.prisma.carreras.update({

      where: {
        id,
      },

      data: updateCarreraDto,

    });

  }

  // Eliminar carrera
  async remove(
    id: number,
  ) {

    await this.findOne(id);

    return this.prisma.carreras.delete({

      where: {
        id,
      },

    });

  }

}