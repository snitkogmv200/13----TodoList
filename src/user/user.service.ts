import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { UserUpdateDto } from './dto/user-update.dto';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entity/role.enum';
import { AddRoleDto } from 'src/role/dto/role-add.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private roleService: RoleService,
  ) {}

  async getUserById(id: string, userId: string) {
    if (id !== userId)
      throw new HttpException(
        'Пользователь может просматривать только свои собственные данные',
        403,
      );

    return this.prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: {
        id,
      },
      include: {
        user_roles: {
          omit: {
            userId: true,
            roleId: true,
          },
          include: {
            role: {},
          },
        },
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
        user_roles: {
          omit: {
            userId: true,
            roleId: true,
          },
          include: {
            role: {},
          },
        },
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
      throw new HttpException(
        'Пользователь может просматривать только свои собственные данные',
        403,
      );

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
        user_roles: {
          omit: {
            userId: true,
            roleId: true,
          },
          include: {
            role: {},
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

    const role = await this.roleService.createIfNotExistsRole({
      value: Role.USER,
    });

    return this.prisma.user.create({
      data: {
        ...user,
        user_roles: {
          create: [
            {
              role: {
                connect: {
                  value: role.value,
                },
              },
            },
          ],
        },
      },
      include: {
        user_roles: {
          omit: {
            userId: true,
            roleId: true,
          },
          include: {
            role: {},
          },
        },
        projects: true,
      },
    });
  }

  async updateUserById(id: string, userId: string, dto: UserUpdateDto) {
    let data = dto;
    const findUser = await this.getUserById(id, userId);
    if (!findUser) throw new HttpException('Пользователь не найден', 404);

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: { id },
      data,
      omit: {
        password: true,
      },
      include: {
        user_roles: {
          omit: {
            userId: true,
            roleId: true,
          },
          include: {
            role: {},
          },
        },
        projects: true,
      },
    });
  }

  async removeUserById(id: string, userId: string) {
    if (id !== userId)
      throw new HttpException(
        'Пользователь может просматривать только свои собственные данные',
        403,
      );

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.getUserById(dto.userId, dto.userId);
    const role = await this.roleService.createIfNotExistsRole({
      value: dto.value,
    });

    if (role && user) {
      return await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          user_roles: {
            connectOrCreate: [
              {
                where: {
                  id: user.user_roles.find((obj) => obj.role.id === role.id)
                    ? user.user_roles.find((obj) => obj.role.id === role.id).id
                    : '',
                },
                create: {
                  role: {
                    connect: {
                      value: role.value,
                    },
                  },
                },
              },
            ],
          },
        },
        select: {
          nickname: true,
          user_roles: {
            select: {
              role: {
                select: {
                  value: true,
                  description: true,
                },
              },
            },
          },
        },
      });
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
