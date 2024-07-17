import { ApiProperty } from '@nestjs/swagger';
import { TaskList } from '@prisma/client';

export class TaskListModel implements TaskList {
  @ApiProperty({
    example: 'dsaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  id: string;

  @ApiProperty({
    example: 'Бла бла бла ...',
    description: 'Описание списка задач',
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Порядковый номер списка задач',
  })
  order: number;

  @ApiProperty({
    example: 'vdaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
    required: true,
  })
  projectId: string;

  @ApiProperty({
    example: 'Выполненные задачи',
    description: 'Категория задач',
    required: true,
  })
  value: string;

  @ApiProperty({
    example: '[{...}]',
    description: 'Массив задач закреплённых за списком',
  })
  tasks: object[];
}
