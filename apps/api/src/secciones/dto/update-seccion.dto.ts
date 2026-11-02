import { PartialType } from '@nestjs/mapped-types';
import { CreateSeccionDto } from './create-seccion.dto';

export class UpdateSeccionDto extends PartialType(CreateSeccionDto) {}
