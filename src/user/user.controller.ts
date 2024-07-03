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
import { UserModel } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // CОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  // ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ЕГО ID
  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return await this.userService.getUserById(id, userId);
  }

  // ПОЛУЧЕНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ ПО ЕГО ID
  @ApiOperation({ summary: 'Получение профиля' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async findProfileUser(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    const profile = await this.userService.getProfile(id, userId);
    if (!profile) throw new HttpException('Profile Not Found', 404);

    return profile;
  }

  // ПОИСК ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
  @ApiOperation({
    summary:
      'Получение всех пользователей (Нарушает приватность пользователей, сделал для себя)',
  })
  @ApiResponse({ status: 200, type: [UserModel] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.getUsers();
  }

  // ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe()) dto: UserUpdateDto,
  ) {
    return this.userService.updateUserById(id, userId, dto);
  }

  // УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: 'Пользователь удалён' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    const user = await this.userService.removeUserById(id, userId);

    if (!user) throw new HttpException('User Not Found', 404);
    else return 'Пользователь удалён';
  }
}
