import {
  IsAlphanumeric,
  IsEmail,
  IsLowercase,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsLowercase()
  @IsAlphanumeric()
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
}
