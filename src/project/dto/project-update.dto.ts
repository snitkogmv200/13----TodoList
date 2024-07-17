import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ProjectUpdateDto {
  @ApiProperty({
    example: 'Убрать дом',
    description: 'Наименование проекта',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(64, {
    message: 'Имя должно быть не более 64 символов',
  })
  name?: string;

  @ApiProperty({
    example: 'Необходимо убрать дом пока не пришли родители',
    description: 'Описание проекта',
    required: false,
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(64, {
    message: 'Описание должно быть не более 128 символов',
  })
  description?: string;
}
