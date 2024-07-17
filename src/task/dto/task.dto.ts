import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  @ApiProperty({
    example: 'Подмести пол',
    description: 'Наименование задачи',
    required: true,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «name» обязательно для заполнения' })
  name: string;

  @ApiProperty({
    example: 'vdaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
    required: true,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «task_list_id» обязательно для заполнения' })
  task_list_id: string;
}
