import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskListDto } from './taskList.dto';

@Injectable()
export class TaskListService {
  constructor(private prisma: PrismaService) {}

  async getTaskListByUserId(userId: string) {
    return this.prisma.taskList.findMany({
      where: {
        project: {
          user: {
            id: userId,
          },
        },
      },
      include: {
        tasks: true,
      },
    });
  }

  async createTaskList(userId: string, dto: TaskListDto) {
    const { value, project_id } = dto;

    return this.prisma.taskList.create({
      data: {
        value,
        project: {
          connect: {
            id: project_id,
          },
        },
      },
      include: {
        project: true,
      },
    });
  }

  async updateTaskList(taskListId, userId, dto: Partial<TaskListDto>) {
    return this.prisma.taskList.update({
      where: {
        id: taskListId,
        project: {
          userId,
        },
      },
      data: dto,
    });
  }

  async deleteTask(taskListId, userId) {
    return this.prisma.taskList.delete({
      where: {
        id: taskListId,
        project: {
          userId,
        },
      },
    });
  }

  // async dragTask(taskId) {

  // }
}
