import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskListDto } from './dto/taskList.dto';
import { ProjectService } from 'src/project/project.service';
import { TaskListUpdateDto } from './dto/taskList.update.dto';

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
    const { project_id } = dto;
    delete dto.project_id;

    const projectsOfUser = this.projectService.getProjectByUserId(userId);
    let findProjectArray = (await projectsOfUser).filter(
      (obj) => obj.id === project_id,
    );
    let findProject: any;
    findProjectArray.map((obj) => (findProject = obj));

    if (!findProject) throw new HttpException('Проект не найден', 404);

    return this.prisma.taskList.create({
      data: {
        ...dto,
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

  async updateTaskList(
    taskListId: string,
    userId: string,
    dto: TaskListUpdateDto,
  ) {
    if (!dto.project_id) {
      return this.prisma.taskList.update({
        where: {
          id: taskListId,
          project: {
            userId,
          },
        },
        data: dto,
        include: {
          project: true,
        },
      });
    } else {
      const { project_id } = dto;
      delete dto.project_id;

      return this.prisma.taskList.update({
        where: {
          id: taskListId,
          project: {
            userId,
          },
        },
        data: {
          projectId: project_id,
          ...dto,
        },
        include: {
          project: true,
        },
      });
    }
  }

  async deleteTask(taskListId: string, userId: string) {
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
