import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'grigoriy.snitko@mail.ru',
    description: 'Почтовый ящик',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'Гриша', description: 'Имя пользователя' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'Grishanchik',
    description: 'Уникальный никнейм пользователя',
  })
  nickname: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @IsOptional()
  @MinLength(4, {
    message: 'The password must be at least 4 characters long',
  })
  @MaxLength(32, {
    message: 'The password must be no more than 32 characters long',
  })
  @IsString()
  password?: string;
}
