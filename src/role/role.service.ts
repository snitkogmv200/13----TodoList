import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDto } from './dto/role.dto';
import { AddRoleDto } from './dto/role-add.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async createRole(dto: RoleDto) {
    return this.prisma.role.create({
      data: {
        ...dto,
      },
    });
  }

  async createIfNotExistsRole(dto: RoleDto) {
    return this.prisma.role.upsert({
      where: {
        value: dto.value,
      },
      update: {},
      create: {
        ...dto,
      },
    });
  }

  async getRoleByValue(value: string) {
    const role = this.prisma.role.findUnique({
      where: {
        value,
      },
    });

    return role;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userService.getUserById(dto.userId, dto.userId);
    const role = await this.createIfNotExistsRole({
      value: dto.value,
    });

    if (role && user) {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
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
      });
    }
  }
}
