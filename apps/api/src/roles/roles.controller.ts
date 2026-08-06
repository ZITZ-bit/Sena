import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

import { CreateRolDto } from './dto/create-rol.dto';

@Controller('roles')
export class RolesController {

  constructor(
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  create(
    @Body() createRolDto: CreateRolDto,
  ) {
    return this.rolesService.create(createRolDto);
  }

  // Obtener todos los roles
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

}