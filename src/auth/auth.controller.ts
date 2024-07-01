import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  login(@Body() userDto: AuthDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/registration')
  registration(@Body() userDto: UserDto) {
    return this.authService.registration(userDto);
  }
}
