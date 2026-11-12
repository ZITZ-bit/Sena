import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AsignacionesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.asignacion_profesor.findMany({
      include: {
        profesores: {
          select: { nombre: true, apellido: true },
        },
        materias: {
          select: { nombre: true, codigo: true },
        },
        secciones: {
          select: { nombre: true },
        },
        semestres: {
          select: { nombre: true },
        },
      },
    });
  }

  async remove(id: number) {
    const assignment = await this.prisma.asignacion_profesor.findUnique({
      where: { id },
    });
    if (!assignment) {
      throw new NotFoundException('Asignación no encontrada.');
    }

    await this.prisma.asignacion_profesor.delete({ where: { id } });
    return { message: 'Asignación eliminada correctamente.' };
  }
}
