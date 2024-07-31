import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Put,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './entity/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserUpdateDto } from './dto/user-update.dto';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { Role } from 'src/role/entity/role.enum';
import { AddRoleDto } from 'src/role/dto/role-add.dto';
import { RoleService } from 'src/role/role.service';
import { UserRoleModel } from './entity/user-role.entity';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  // Выводит захеш. пароль пользователя, но этот контроллер впринципе не нужен, так как пользователь создаётся через регистрацию, функционал сделан для наглядности
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: UserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    const user = await this.userService.getUserById(id, userId);

    if (!user) {
      throw new NotFoundException(`Указанный пользователь: ${user} не найдет.`);
    }

    return user;
  }

  @ApiOperation({ summary: 'Получение профиля' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async findProfileUser(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.userService.getProfile(id, userId);
  }

  @ApiOperation({
    summary:
      'Получение всех пользователей (Нарушает приватность пользователей, сделал для себя)',
  })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe()) dto: UserUpdateDto,
  ) {
    return await this.userService.updateUserById(id, userId, dto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: 'Пользователь удалён' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    const user = await this.userService.removeUserById(id, userId);

    if (!user) throw new HttpException('Пользователь не найден', 404);
    else return 'Пользователь удалён';
  }

  @ApiOperation({ summary: 'Выдача ролей пользователю' })
  @ApiResponse({ status: 201, type: UserRoleModel })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/role')
  addRole(@Body(new ValidationPipe()) dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
}
