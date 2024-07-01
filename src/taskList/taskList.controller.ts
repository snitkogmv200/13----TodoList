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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskListService } from './taskList.service';
import { TaskListDto } from './taskList.dto';

@Controller('/taskList')
export class TaskListController {
  constructor(private taskService: TaskListService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTaskList(@CurrentUser('id') userId: string) {
    return this.taskService.getTaskListByUserId(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @CurrentUser('id') userId: string,
    @Body() dto: TaskListDto,
  ) {
    return this.taskService.createTaskList(userId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: TaskListDto,
  ) {
    return this.taskService.updateTaskList(id, userId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.taskService.deleteTask(id, userId);
  }
}
