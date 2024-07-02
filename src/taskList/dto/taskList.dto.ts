import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class TaskListDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «value» обязательно для заполнения' })
  @MaxLength(64, {
    message: 'Значение должно быть не более 64 символов',
  })
  value: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(128, {
    message: 'Значение должно быть не более 128 символов',
  })
  description?: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «project_id» обязательно для заполнения' })
  project_id: string;
}
