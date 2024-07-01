import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Put,
  UsePipes,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @ApiOperation({ summary: 'Получение пользователя' })
  // @ApiResponse({ status: 200, type: UserModel })
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log('fssf');
    // const user = await this.userService.getUserById(id, userId);
    // if (!user) throw new HttpException('User Not Found', 404);

    // return user;
  }

  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  async findOneAlternate(@Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new HttpException('User Not Found', 404);

    return user;
  }

  @ApiOperation({ summary: 'Получение профиля' })
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async findProfileUser(@Param('id') id: string) {
    const profile = await this.userService.getProfile(id);
    if (!profile) throw new HttpException('Profile Not Found', 404);

    return profile;
  }

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

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UserDto,
  ) {
    return this.userService.updateUserById(id, userId, dto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
