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
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskDto } from './task.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTask(@CurrentUser('id') userId: string) {
    return this.taskService.getTaskByUserId(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(@CurrentUser('id') userId: string, @Body() dto: TaskDto) {
    return this.taskService.createTask(userId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: TaskDto,
  ) {
    return this.taskService.updateTask(id, userId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.taskService.deleteTask(id, userId);
  }
}
