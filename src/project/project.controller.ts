import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectDto } from './project.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('/project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProject(@CurrentUser('id') userId: string) {
    return this.projectService.getProjectByUserId(userId);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создание проекта' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createProject: ProjectDto,
  ) {
    return this.projectService.createProject(userId, ProjectDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateProject(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: ProjectDto,
  ) {
    return this.projectService.updateTaskList(id, userId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProject(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectService.deleteProject(id, userId);
  }
}
