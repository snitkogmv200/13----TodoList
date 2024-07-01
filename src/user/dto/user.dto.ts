import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'grigoriy.snitko@mail.ru',
    description: 'Почтовый ящик',
  })
  @IsNotEmpty({ message: 'Поле «email» обязательно для заполнения' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'Гриша', description: 'Имя пользователя' })
  @IsNotEmpty({ message: 'Поле «name» обязательно для заполнения' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(64, {
    message: 'Имя должно быть не больше 64 символов',
  })
  name: string;

  @ApiProperty({
    example: 'Grishanchik',
    description: 'Уникальный никнейм пользователя',
  })
  @IsNotEmpty({ message: 'Поле «nickname» обязательно для заполнения' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(64, {
    message: 'Никнейм должен быть не более 64 символов',
  })
  nickname: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @IsNotEmpty({ message: 'Поле «пароль» обязательно для заполнения' })
  @Length(4, 32, {
    message: 'Пароль должен быть не меньше 4 и не больше 32 символов',
  })
  @IsString()
  readonly password: string;
}
