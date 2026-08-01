import { PartialType } from '@nestjs/mapped-types';
import { CreateSemestreDto } from './create-semestre.dto';

export class UpdateSemestreDto extends PartialType(CreateSemestreDto) {}
