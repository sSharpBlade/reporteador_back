import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { Request } from 'express';
import { Roles } from './Decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './enums/role.enum';

interface RequestWhitUser extends Request {
  user: {
    email: string;
    role: string;
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
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@Req() req: RequestWhitUser) {
    return this.authService.profile(req.user);
  }
}
