import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getProjectByUserId(userId: string) {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        tasks_list: {
          include: {
            tasks: true,
          },
        },
      },
    });
  }

  async createProject(userId: string, dto: ProjectDto) {
    return this.prisma.project.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        ...dto,
      },
      include: {
        tasks_list: true,
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
    return this.prisma.project.delete({
      where: {
        id: projectId,
        userId,
      },
    });
  }

  // async dragProject(taskId) {

  // }
}
