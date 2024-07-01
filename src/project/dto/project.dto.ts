import { IsOptional, IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
