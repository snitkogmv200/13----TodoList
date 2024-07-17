import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class ProjectDto {
  @ApiProperty({
    example: 'Убрать дом',
    description: 'Наименование проекта',
    required: true,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «name» обязательно для заполнения' })
  @MaxLength(64, {
    message: 'Имя должно быть не более 64 символов',
  })
  name: string;

  @ApiProperty({
    example: 'Необходимо убрать дом пока не пришли родители',
    description: 'Описание проекта',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(64, {
    message: 'Описание должно быть не более 128 символов',
  })
  description?: string;
}
