import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../../application/dto/login.dto';
// import { RegisterDto } from './dto/register.dto';
import { AuthService } from '../../domain/servies/auth.service';
import { Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../application/guards/auth.guard';
import { Request } from 'express';
import { Roles } from '../../application/Decorators/roles.decorator';
import { RolesGuard } from '../../application/guards/roles.guard';
import { Role } from '../../application/enums/role.enum';

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
