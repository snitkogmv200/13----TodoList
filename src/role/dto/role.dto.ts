import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class RoleDto {
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
    example: 'Имеет доступ к просмотру данных всех пользователей',
    description: 'Описание Role',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(128, {
    message: 'Значение должно быть не более 128 символов',
  })
  description?: string;
}
