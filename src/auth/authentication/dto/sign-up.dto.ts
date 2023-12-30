import {
  IsEmail,
  IsPhoneNumber,
  MinLength,
  IsAlphanumeric,
  IsString,
  IsStrongPassword,
  IsLowercase,
} from 'class-validator';

export class SignUpDto {
  @IsAlphanumeric()
  @IsLowercase()
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsPhoneNumber('CU')
  phone: string;

  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;
}
