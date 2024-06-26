import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: {
        id,
      },
      include: {
        projects: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
      include: {
        projects: true,
      },
    });
  }

  async getProfile(id: string) {
    // УБРАТЬ ЗАПРОСЫ И СДЕЛАТЬ ЧЕРЕЗ JOIN (PRISMA INCLUDE)
    // const user = await this.getUserById(id);
    // const projects = await this.prisma.project.findMany({
    //   where: {
    //     userId: profile.id,
    //   },
    // });
    // const tasksList = await this.prisma.taskList.findMany({
    //   where: {
    //     projectId: { in: projects.map((obj) => obj.id) },
    //   },
    // });
    // const tasks = await this.prisma.task.findMany({
    //   where: {
    //     taskId: { in: tasksList.map((obj) => obj.id) },
    //   },
    // });

    const profile = await this.prisma.user.findMany({
      omit: {
        password: true,
      },
      where: {
        id,
      },
      include: {
        projects: {
          include: {
            tasks_list: {
              include: {
                tasks: {},
              },
            },
          },
        },
      },
    });

    return profile;
    // return { projects, tasksList, tasks };
  }

  async createUser(dto: UserDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      nickname: dto.nickname,
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }

  async updateUserById(id: string, dto: UserDto) {
    let data = dto;
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User Not Found', 404);

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({ where: { id }, data });
  }
}
