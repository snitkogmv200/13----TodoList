import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';

export class ProjectModel implements Project {
  @ApiProperty({
    example: 'alxj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  id: string;

  @ApiProperty({
    example: '2024-06-17T15:24:09.475Z',
    description: 'Дата создания',
  })
  date_created: Date;

  @ApiProperty({
    example: 'Домашние обязанности',
    description: 'Наименование проекта',
  })
  name: string;

  @ApiProperty({
    example: 'Домашние обязанности которые ...',
    description: 'Описание проекта',
  })
  description: string;

  @ApiProperty({
    example: 'llxj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  userId: string;

  @ApiProperty({
    example: '[{...}, {...}, {...}]',
    description: 'Уникальный идентификатор',
  })
  tasks_list: object[];
}
