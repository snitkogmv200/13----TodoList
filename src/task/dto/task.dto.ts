import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «name» обязательно для заполнения' })
  name: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле «task_list_id» обязательно для заполнения' })
  task_list_id: string;
}
