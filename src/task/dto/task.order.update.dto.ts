import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class TaskUpdateOrderDto {
  @ApiProperty({
    example: '["vdaj4lnr700006jawitf3b70j", "sdaj4lnr700006jawitf3b70j"]',
    description:
      'Массив состоящий из id задач, которым нужно изменить порядковый номер',
    required: true,
  })
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
