import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthModel } from './entity/auth.entity';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Логин пользователя',
  })
  @ApiResponse({ status: 201, type: AuthModel })
  @Post('/login')
  login(@Body(new ValidationPipe()) userDto: AuthDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({
    summary: 'Регистрация пользователя',
  })
  @ApiResponse({ status: 201, type: AuthModel })
  @Post('/registration')
  registration(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.authService.registration(userDto);
  }
}
