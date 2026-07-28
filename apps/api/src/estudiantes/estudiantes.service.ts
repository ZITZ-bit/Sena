import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RolesService } from '../roles/roles.service';

import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly usuariosService: UsuariosService,
    private readonly rolesService: RolesService,
  ) {}

  // Registrar estudiante
  async create(createEstudianteDto: CreateEstudianteDto) {

    // Aquí construiremos toda la lógica después.
    return 'Registrar estudiante';

  }

  // Obtener todos los estudiantes
  async findAll() {

    return this.prisma.estudiantes.findMany({

      include: {
        carreras: true,
        semestres: true,
        usuarios: true,
      },

    });

  }

  // Buscar estudiante por ID
  async findOne(id: number) {

    const estudiante = await this.prisma.estudiantes.findUnique({

      where: {
        id,
      },

      include: {
        carreras: true,
        semestres: true,
        usuarios: true,
      },

    });

    if (!estudiante) {
      throw new NotFoundException(
        'Estudiante no encontrado.',
      );
    }

    return estudiante;

  }

  // Actualizar estudiante
  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ) {

    await this.findOne(id);

    return this.prisma.estudiantes.update({

      where: {
        id,
      },

      data: updateEstudianteDto,

    });

  }

  // Desactivar estudiante
  async disable(id: number) {

    const estudiante = await this.findOne(id);

    return this.usuariosService.disableUser(
      estudiante.usuario_id,
    );

  }

}