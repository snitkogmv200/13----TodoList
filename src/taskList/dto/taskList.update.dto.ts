import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class TaskListUpdateDto {
  @ApiProperty({
    example: 'Отложенные задачи',
    description: 'Категория задач',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(64, {
    message: 'Значение должно быть не более 64 символов',
  })
  value?: string;

  @ApiProperty({
    example: 'Бла бла бла ...',
    description: 'Описание TodoList',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(128, {
    message: 'Значение должно быть не более 128 символов',
  })
  description?: string;

  @ApiProperty({
    example: 'vdaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  project_id?: string;
}
