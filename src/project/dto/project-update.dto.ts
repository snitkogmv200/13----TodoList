import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class ProjectUpdateDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(64, {
    message: 'Имя должно быть не более 64 символов',
  })
  name?: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(64, {
    message: 'Описание должно быть не более 128 символов',
  })
  description?: string;
}
