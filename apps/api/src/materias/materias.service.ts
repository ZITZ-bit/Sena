import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMateriaDto: CreateMateriaDto) {
    const carrera = await this.prisma.carreras.findUnique({
      where: { id: createMateriaDto.carrera_id },
    });

    if (!carrera) {
      throw new BadRequestException('La carrera asociada no existe.');
    }

    const materiaExistente = await this.prisma.materias.findFirst({
      where: { codigo: createMateriaDto.codigo },
    });

    if (materiaExistente) {
      throw new BadRequestException('La materia ya está registrada.');
    }

    return this.prisma.materias.create({
      data: createMateriaDto,
    });
  }

  async findAll() {
    return this.prisma.materias.findMany({
      include: { carreras: true, secciones: true },
    });
  }

  async findOne(id: number) {
    const materia = await this.prisma.materias.findUnique({
      where: { id },
      include: { carreras: true, secciones: true },
    });

    if (!materia) {
      throw new NotFoundException('Materia no encontrada.');
    }

    return materia;
  }

  async update(id: number, updateMateriaDto: UpdateMateriaDto) {
    await this.findOne(id);

    return this.prisma.materias.update({
      where: { id },
      data: updateMateriaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.materias.delete({
      where: { id },
    });
  }
}
