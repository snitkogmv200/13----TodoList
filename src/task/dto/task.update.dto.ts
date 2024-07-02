import { IsOptional, IsString } from 'class-validator';

export class TaskUpdateDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  task_list_id?: string;
}
