import { IsArray, IsString } from 'class-validator';

export class TaskUpdateOrderDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
