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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskListService } from './taskList.service';
import { TaskListDto } from './dto/taskList.dto';
import { TaskListUpdateDto } from './dto/taskList.update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskListModel } from './entity/taskList.entity';
import { TaskListSendModel } from './entity/taskList.send.entity';

@ApiTags('Список задач')
@Controller('/taskList')
export class TaskListController {
  constructor(private taskService: TaskListService) {}

  @ApiOperation({ summary: 'Получение всего списка задач всех проектов' })
  @ApiResponse({ status: 200, type: [TaskListModel] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTaskList(@CurrentUser('id') userId: string) {
    return this.taskService.getTaskListByUserId(userId);
  }

  @ApiOperation({ summary: 'Создание списка задач' })
  @ApiResponse({ status: 201, type: [TaskListSendModel] })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTaskList(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe()) dto: TaskListDto,
  ) {
    return this.taskService.createTaskList(userId, dto);
  }

  @ApiOperation({ summary: 'Изменение данных списка задач' })
  @ApiResponse({ status: 200, type: [TaskListSendModel] })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTaskList(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) dto: TaskListUpdateDto,
  ) {
    const taskList = this.taskService.updateTaskList(id, userId, dto);

    if (!taskList) throw new HttpException('Список задач не найден', 404);

    return taskList;
  }

  @ApiOperation({ summary: 'Удаление списка задач' })
  @ApiResponse({ status: 200, type: Delete })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTaskList(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    const taskList = this.taskService.deleteTask(id, userId);

    if (!taskList) throw new HttpException('Список задач не найден', 404);

    return 'TaskList удалён';
  }
}
