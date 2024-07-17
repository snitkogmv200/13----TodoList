import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TaskUpdateDto {
  @ApiProperty({
    example: 'Подмести пол',
    description: 'Наименование задачи',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'vdaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  task_list_id?: string;
}
