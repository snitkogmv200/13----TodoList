import { IsArray, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
