import {
  IsAlphanumeric,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsOptional()
  @IsAlphanumeric()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsNumberString()
  tfaCode?: string;
}
