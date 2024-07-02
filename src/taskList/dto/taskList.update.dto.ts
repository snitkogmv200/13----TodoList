import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class TaskListUpdateDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(64, {
    message: 'Значение должно быть не более 64 символов',
  })
  value?: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(128, {
    message: 'Значение должно быть не более 128 символов',
  })
  description?: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  project_id?: string;
}
