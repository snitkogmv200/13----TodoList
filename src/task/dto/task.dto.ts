import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  date_modified?: string;

  @IsBoolean()
  @IsOptional()
  is_completed?: boolean;

  @IsString()
  @IsOptional()
  task_list_id: string;
}
