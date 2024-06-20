import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
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
      include: {
        projects: true,
      },
    });
  }

  // async getProfile(id: string) {
  //   const profile = await this.getUserById(id);

  //   const totalTasks = profile.tasks.length;
  //   const completedTasks = await this.prisma.task.count({
  //     where: {
  //       userId: id,
  //       isCompleted: true,
  //     },
  //   });
  // }

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
