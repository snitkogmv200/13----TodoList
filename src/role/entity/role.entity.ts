import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleModel implements Role {
  @ApiProperty({
    example: 'clxj4lnr700006jawitf3b70j',
    description: 'Уникальный идентификатор',
  })
  id: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Роль для пользователя',
    required: true,
  })
  value: string;

  @ApiProperty({
    example: 'Имеется возможность просматривать всех пользователей',
    description: 'Права и возможности роли',
    required: false,
  })
  description: string;
}
