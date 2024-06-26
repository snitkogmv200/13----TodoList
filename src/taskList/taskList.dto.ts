import { IsOptional, IsString } from 'class-validator';

export class TaskListDto {
  @IsString()
  @IsOptional()
  value: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  project_id: string;
}
