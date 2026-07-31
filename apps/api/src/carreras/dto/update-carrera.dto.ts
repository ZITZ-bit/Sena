import { PartialType } from '@nestjs/mapped-types';
import { CreateCarreraDto } from './create-carrera.dto';

export class UpdateCarreraDto extends PartialType(CreateCarreraDto) {}
