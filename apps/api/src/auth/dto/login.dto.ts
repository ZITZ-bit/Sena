import { IsString, MinLength } from 'class-validator';

export class LoginDto {

  @IsString()
  cedula!: string;

  @IsString()
  @MinLength(6)
  password!: string;

}