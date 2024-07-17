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
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './entity/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return await this.userService.getUserById(id, userId);
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
  @UseGuards(JwtAuthGuard)
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
}
