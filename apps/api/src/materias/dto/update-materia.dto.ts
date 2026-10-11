import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateMateriaDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigo?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  creditos?: number;

  @IsOptional()
  @IsInt()
  carrera_id?: number;
}
