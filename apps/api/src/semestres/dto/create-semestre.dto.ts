import {IsString, MaxLength} from 'class-validator';

export class CreateSemestreDto {

  @IsString()
  @MaxLength(50)
  nombre!: string;

}