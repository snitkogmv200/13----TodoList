import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTaskByUserId(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async createTask(userId: string, dto: TaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateTask(taskId, userId, dto: Partial<TaskDto>) {
    return this.prisma.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: dto,
    });
  }

  async deleteTask(taskId, userId) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  // async dragTask(taskId) {

  // }
}
