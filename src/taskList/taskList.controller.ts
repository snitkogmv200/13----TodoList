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
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskListService } from './taskList.service';
import { TaskListDto } from './dto/taskList.dto';
import { TaskListUpdateDto } from './dto/taskList.update.dto';

@Controller('/taskList')
export class TaskListController {
  constructor(private taskService: TaskListService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTaskList(@CurrentUser('id') userId: string) {
    return this.taskService.getTaskListByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTaskList(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe()) dto: TaskListDto,
  ) {
    return this.taskService.createTaskList(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTaskList(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) dto: TaskListUpdateDto,
  ) {
    const taskList = this.taskService.updateTaskList(id, userId, dto);

    if (!taskList) throw new HttpException('TaskList Not Found', 404);

    return taskList;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTaskList(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    const taskList = this.taskService.deleteTask(id, userId);

    if (!taskList) throw new HttpException('TaskList Not Found', 404);

    return 'TaskList удалён';
  }
}
