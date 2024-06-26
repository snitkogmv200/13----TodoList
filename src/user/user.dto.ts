import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'grigoriy.snitko@mail.ru',
    description: 'Почтовый ящик',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'Гриша', description: 'Имя пользователя' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  name?: string;

  @ApiProperty({
    example: 'Grishanchik',
    description: 'Уникальный никнейм пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  nickname?: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @IsOptional()
  @Length(4, 32, {
    message: 'The password must be at least 4 and no more than 32',
  })
  @IsString()
  readonly password?: string;
}
