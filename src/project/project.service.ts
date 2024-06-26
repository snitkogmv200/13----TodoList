import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getProjectByUserId(userId: string) {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
    });
  }

  async createProject(userId: string, dto: ProjectDto) {
    return this.prisma.project.create({
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

  async updateTaskList(projectId, userId, dto: Partial<ProjectDto>) {
    return this.prisma.project.update({
      where: {
        id: projectId,
        userId,
      },
      data: dto,
    });
  }

  async deleteProject(projectId, userId) {
    return this.prisma.task.delete({
      where: {
        id: projectId,
        userId,
      },
    });
  }

  // async dragProject(taskId) {

  // }
}
