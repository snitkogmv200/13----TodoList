import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createIfNotExistsRole(dto: RoleDto) {
    return await this.prisma.role.upsert({
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
    return await this.prisma.role.findUnique({
      where: {
        value,
      },
    });
  }

  async getRoles() {
    return await this.prisma.role.findMany({});
  }
}
