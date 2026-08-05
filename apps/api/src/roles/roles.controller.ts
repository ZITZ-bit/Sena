import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

  constructor(
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  create(
    @Body() body: {
      nombre: string;
      descripcion?: string;
    },
  ) {
    return this.rolesService.create(
      body.nombre,
      body.descripcion,
    );
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

}