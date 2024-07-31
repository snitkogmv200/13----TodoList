import { ApiProperty } from '@nestjs/swagger';

export class UserRoleModel {
  @ApiProperty({
    example: 'Grishan',
    description: 'Уникальный никнейм пользователя',
  })
  nickname: string;

  @ApiProperty({
    example: '[{...}, {...}, {...}]',
    description: 'Роли пользователя',
  })
  user_roles: object[];
}
