import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSeccionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  nombre!: string;

  @IsInt()
  materia_id!: number;
}
