import { IsDateString, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProfesorDto {
  // Datos del usuario
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  cedula!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  // Datos del profesor
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsString()
  @MaxLength(100)
  apellido!: string;

  @IsEmail()
  correo!: string;

  @IsDateString()
  fecha_nacimiento!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

}