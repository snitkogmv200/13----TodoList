import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto/project.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';

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

  async updateTaskList(
    projectId: string,
    userId: string,
    dto: Partial<ProjectUpdateDto>,
  ) {
    return this.prisma.project.update({
      where: {
        id: projectId,
        userId,
      },
      data: dto,
    });
  }

  async deleteProject(projectId: string, userId: string) {
    try {
      const project = this.prisma.project.delete({
        where: {
          id: projectId,
          userId,
        },
      });

      return project;
    } catch (error) {
      throw new ForbiddenException('Credentials');
    }
  }

  // async dragProject(taskId) {

  // }
}
