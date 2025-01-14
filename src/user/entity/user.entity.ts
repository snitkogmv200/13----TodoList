import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class UserModel implements User {
  @ApiProperty({
    example: 'clxj4lnr700006jawitf3b70j',
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
    example: 'grisha@mail.ru',
    description: 'email',
    required: true,
  })
  email: string;
  @ApiProperty({
    example: 'Гриша',
    description: 'Имя пользователя',
    required: true,
  })
  name: string;
  @ApiProperty({
    example: 'Grishan',
    description: 'Уникальный никнейм пользователя',
    required: true,
  })
  nickname: string;

  @Exclude()
  password: string;

  @ApiProperty({
    example: '[{...}, {...}, {...}]',
    description: 'Проекты пользователя',
  })
  projects: object[];
}
