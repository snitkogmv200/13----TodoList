import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto/task.dto';
import { TaskUpdateOrderDto } from './dto/task.order.update.dto';
import { TaskUpdateDto } from './dto/task.update.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTaskByUserId(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async createTask(userId: string, dto: TaskDto) {
    const { task_list_id } = dto;
    delete dto.task_list_id;

    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
        task_list: {
          connect: {
            id: task_list_id,
          },
        },
      },
    });
  }

  async updateTask(taskId: string, userId: string, dto: TaskUpdateDto) {
    return this.prisma.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: dto,
    });
  }

  async deleteTask(taskId: string, userId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  async updateOrderTask(ids: string[]) {
    return this.prisma.$transaction(
      ids.map((id, order) =>
        this.prisma.task.update({
          where: { id },
          data: { order },
        }),
      ),
    );
  }
}
