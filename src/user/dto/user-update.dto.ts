import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    example: 'grigoriy.snitko@mail.ru',
    description: 'Почтовый ящик',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'Гриша', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(64, {
    message: 'Имя должно быть не больше 64 символов',
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Grishanchik',
    description: 'Уникальный никнейм пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(64, {
    message: 'Никнейм должен быть не более 64 символов',
  })
  @IsOptional()
  nickname?: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @Length(4, 32, {
    message: 'Пароль должен быть не меньше 4 и не больше 32 символов',
  })
  @IsOptional()
  @IsString()
  readonly password?: string;
}
