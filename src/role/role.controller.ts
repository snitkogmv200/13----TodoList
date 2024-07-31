import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Roles } from 'src/auth/role-auth.decorator';
import { Role } from './entity/role.enum';
import { RoleModel } from './entity/role.entity';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Создание или изменение роли' })
  @ApiResponse({ status: 201, type: RoleModel })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body(new ValidationPipe()) dto: RoleDto) {
    return await this.roleService.createIfNotExistsRole(dto);
  }

  @ApiOperation({ summary: 'Получение роли по её значению' })
  @ApiResponse({ status: 200, type: RoleModel })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    const role = await this.roleService.getRoleByValue(value);

    if (!role) {
      throw new NotFoundException(`Указанная роль: ${value} не существует.`);
    }

    return role;
  }

  @ApiOperation({ summary: 'Получение всех существующих ролей' })
  @ApiResponse({ status: 200, type: [RoleModel] })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return await this.roleService.getRoles();
  }
}
