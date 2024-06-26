import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(4, {
    message: 'The password must be at least 4 characters long',
  })
  @IsString()
  password: string;
}
