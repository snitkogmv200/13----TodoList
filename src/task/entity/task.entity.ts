import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';

export class TaskModel implements Task {
  @ApiProperty({
    example: 'ssaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  id: string;

  @ApiProperty({
    example: '2024-06-17T15:24:09.475Z',
    description: 'Дата создания',
  })
  date_created: Date;

  @ApiProperty({
    example: '2024-06-17T16:07:03.057Z',
    description: 'Дата редактирования',
  })
  date_modified: Date;

  @ApiProperty({
    example: 'Помыть посуду',
    description: 'Наименование задачи',
  })
  name: string;

  @ApiProperty({
    example: 2,
    description: 'Порядковый номер задачи',
  })
  order: number;

  @ApiProperty({
    example: 'hdaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  taskListId: string;

  @ApiProperty({
    example: 'qdaj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  userId: string;
}
