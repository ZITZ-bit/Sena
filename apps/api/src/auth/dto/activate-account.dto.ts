import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ActivateAccountDto {
  @IsString()
  @Matches(/^[a-f0-9]{64}$/)
  token!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}
