import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './user.entity';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserModel })
  @Post()
  async create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User Not Found', 404);

    return user;
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @Get()
  async findAll() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUserById(id, dto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
