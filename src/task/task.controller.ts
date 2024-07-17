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
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskDto } from './dto/task.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskUpdateOrderDto } from './dto/task.order.update.dto';
import { TaskUpdateDto } from './dto/task.update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskModel } from './entity/task.entity';

@ApiTags('Задачи')
@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, type: [TaskModel] })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTask(@CurrentUser('id') userId: string) {
    return this.taskService.getTaskByUserId(userId);
  }

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 201, type: TaskModel })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe()) dto: TaskDto,
  ) {
    return this.taskService.createTask(userId, dto);
  }

  @ApiOperation({ summary: 'Изменение данных задачи' })
  @ApiResponse({ status: 200, type: TaskModel })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTask(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) dto: TaskUpdateDto,
  ) {
    return this.taskService.updateTask(id, userId, dto);
  }

  @ApiOperation({ summary: 'Удаление определённой задачи' })
  @ApiResponse({ status: 200, type: Delete })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string, @CurrentUser('id') userId: string) {
    const task = this.taskService.deleteTask(id, userId);

    if (!task) throw new HttpException('Задача не найдена', 404);

    return 'задача удалена';
  }

  // ПЕРЕДАЁТСЯ ОБЬЕКТ СО СВОЙСТВОМ "ids"
  @ApiOperation({
    summary:
      'Изменение порядкового номера определённой задачи или нескольких задач',
  })
  @ApiResponse({ status: 200, type: [TaskModel] })
  @UseGuards(JwtAuthGuard)
  @Put('update/order')
  async updateOrderTask(
    @Body(new ValidationPipe()) updateTaskDto: TaskUpdateOrderDto,
  ) {
    return this.taskService.updateOrderTask(updateTaskDto.ids);
  }
}
