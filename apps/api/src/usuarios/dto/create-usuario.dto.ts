import { IsString, Length, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @Length(7, 20)
  cedula!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
