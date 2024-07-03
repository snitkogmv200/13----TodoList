import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body(new ValidationPipe()) userDto: AuthDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.authService.registration(userDto);
  }
}
