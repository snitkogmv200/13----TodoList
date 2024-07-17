import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ProjectService } from './project.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectDto } from './dto/project.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectModel } from './entity/project.entity';

@ApiTags('Проекты')
@Controller('/project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOperation({ summary: 'Получение всех проектов пользователя' })
  @ApiResponse({ status: 200, type: [ProjectModel] })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProject(@CurrentUser('id') userId: string) {
    return this.projectService.getProjectByUserId(userId);
  }

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 201, type: ProjectModel })
  @ApiOperation({ summary: 'Создание проекта' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe()) createProject: ProjectDto,
  ) {
    return this.projectService.createProject(userId, createProject);
  }

  @ApiOperation({ summary: 'Изменение проекта' })
  @ApiResponse({ status: 200, type: ProjectModel })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProject(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) dto: ProjectUpdateDto,
  ) {
    const project = this.projectService.updateTaskList(id, userId, dto);

    if (!project) throw new HttpException('Проект не найден', 404);

    return project;
  }

  @ApiOperation({ summary: 'Удаление проекта' })
  @ApiResponse({ status: 200, type: Delete })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProject(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectService.deleteProject(id, userId);
  }
}
