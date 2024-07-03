import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «email» обязательно для заполнения' })
  email: string;

  @MinLength(4, {
    message: 'The password must be at least 4 characters long',
  })
  @IsNotEmpty({ message: 'Поле «пароль» обязательно для заполнения' })
  @Length(4, 32, {
    message: 'Пароль должен быть не меньше 4 и не больше 32 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  password: string;
}
