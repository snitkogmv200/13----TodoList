import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string, userId: string) {
    if (id !== userId)
      throw new HttpException('The user can only view their own data', 403);

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
      include: {
        projects: true,
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

  async getProfile(id: string, userId: string) {
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

    if (id !== userId)
      throw new HttpException('The user can only view their own data', 403);

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
    console.log(dto);
    const user = {
      email: dto.email,
      name: dto.name,
      nickname: dto.nickname,
      password: await hash(dto.password),
    };
    console.log(user);

    return this.prisma.user.create({
      data: user,
      include: {
        projects: true,
      },
    });
  }

  async updateUserById(id: string, userId: string, dto: UserUpdateDto) {
    let data = dto;
    const findUser = await this.getUserById(id, userId);
    if (!findUser) throw new HttpException('User Not Found', 404);

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: { id },
      data,
      include: { projects: true },
    });
  }

  async removeUserById(id: string, userId: string) {
    if (id !== userId)
      throw new HttpException('The user can only view their own data', 403);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
