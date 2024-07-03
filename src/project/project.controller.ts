import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ProjectService } from './project.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectDto } from './dto/project.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ProjectUpdateDto } from './dto/project-update.dto';

@Controller('/project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProject(@CurrentUser('id') userId: string) {
    return this.projectService.getProjectByUserId(userId);
  }

  @ApiOperation({ summary: 'Создание проекта' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe()) createProject: ProjectDto,
  ) {
    return this.projectService.createProject(userId, createProject);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProject(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) dto: ProjectUpdateDto,
  ) {
    const project = this.projectService.updateTaskList(id, userId, dto);

    if (!project) throw new HttpException('Project Not Found', 404);

    return project;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProject(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectService.deleteProject(id, userId);
  }
}
