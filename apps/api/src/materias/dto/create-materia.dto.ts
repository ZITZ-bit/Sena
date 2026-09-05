import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateMateriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  creditos?: number;

  @IsInt()
  carrera_id!: number;
}
