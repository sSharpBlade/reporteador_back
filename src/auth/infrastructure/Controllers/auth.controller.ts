import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../../application/dto/login.dto';
// import { RegisterDto } from './dto/register.dto';
import { AuthService } from '../../domain/servies/auth.service';
import { Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { Role } from '../../../common/enums/role.enum';
import { Auth } from 'src/auth/application/Decorators/auth.decorator';

interface RequestWhitUser extends Request {
  user: {
    email: string;
    roles: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ! Por motivo del proyecto se suprime la funcionalidad de registro
  // @Post('register')
  // register(@Body() registerDto: RegisterDto) {
  //   return this.authService.register(registerDto);
  // }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.ADMIN)
  async profile(@Req() req: RequestWhitUser) {
    const { email, roles } = req.user;
    console.log(email, roles);
    return await this.authService.profile({ email, role: roles[0] });
  }
}
