import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';

@Injectable()
export class SeccionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSeccionDto: CreateSeccionDto) {
    const materia = await this.prisma.materias.findUnique({
      where: { id: createSeccionDto.materia_id },
    });

    if (!materia) {
      throw new BadRequestException('La materia asociada no existe.');
    }

    return this.prisma.secciones.create({
      data: createSeccionDto,
      include: { materias: true },
    });
  }

  async findAll() {
    return this.prisma.secciones.findMany({
      include: { materias: { include: { carreras: true } } },
    });
  }

  async findOne(id: number) {
    const seccion = await this.prisma.secciones.findUnique({
      where: { id },
      include: { materias: { include: { carreras: true } } },
    });

    if (!seccion) {
      throw new NotFoundException('Sección no encontrada.');
    }

    return seccion;
  }

  async update(id: number, updateSeccionDto: UpdateSeccionDto) {
    await this.findOne(id);

    return this.prisma.secciones.update({
      where: { id },
      data: updateSeccionDto,
      include: { materias: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.secciones.delete({
      where: { id },
    });
  }
}
