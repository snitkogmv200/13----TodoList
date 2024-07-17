import { ApiProperty } from '@nestjs/swagger';
import { TaskList } from '@prisma/client';

export class TaskListSendModel implements TaskList {
  @ApiProperty({
    example: 'dsaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  id: string;

  @ApiProperty({
    example: 'Бла бла бла ...',
    description: 'Описание TodoList',
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Порядковый номер TodoList',
  })
  order: number;

  @ApiProperty({
    example: 'vdaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  projectId: string;

  @ApiProperty({
    example: 'Выполненные задачи',
    description: 'Категория задач',
  })
  value: string;

  @ApiProperty({
    example: '{...}',
    description: 'Массив задач закреплённых за списком',
  })
  project: object;
}
