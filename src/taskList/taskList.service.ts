import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskListDto } from './taskList.dto';
import { ProjectService } from 'src/project/project.service';

// МОЖНО СВЯЗАТЬ С USER И СДЕЛАТЬ ЗАПРОСЫ ПОДОБНЫЕ В ДРУГИХ СУЩНОСТЯХ
@Injectable()
export class TaskListService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
  ) {}

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

    const projectsOfUser = this.projectService.getProjectByUserId(userId);
    let findProjectArray = (await projectsOfUser).filter(
      (obj) => obj.id === project_id,
    );
    let findProject;
    findProjectArray.map((obj) => (findProject = obj));

    if (!findProject) throw new HttpException('Project Not Found', 404);

    return this.prisma.taskList.create({
      data: {
        value,
        project: {
          connect: {
            id: findProject.id,
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
