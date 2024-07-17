import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: UserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.createUser(userDto);

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(userDto: AuthDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  private async validateUser(userDto: AuthDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await verify(user.password, userDto.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
