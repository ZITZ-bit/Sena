import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCarreraDto {

    @IsString()
    @MaxLength(100)
    nombre!: string;

    @IsOptional()
    @IsString()
    descripcion?: string;
    
}