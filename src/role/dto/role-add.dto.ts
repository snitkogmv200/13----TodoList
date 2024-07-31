import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({
    example: 'Админ',
    description: 'Наименование роли',
    required: true,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «value» обязательно для заполнения' })
  @MaxLength(64, {
    message: 'Значение должно быть не более 64 символов',
  })
  readonly value: string;

  @ApiProperty({
    example: 'clz9p0ohz0001xjb3yfqp2xd1',
    description: 'id пользователя, которому нужно присвоить роль',
    required: true,
  })
  @IsNotEmpty({ message: 'Поле «userId» обязательно для заполнения' })
  @IsString({ message: 'Должно быть строкой' })
  readonly userId: string;
}
