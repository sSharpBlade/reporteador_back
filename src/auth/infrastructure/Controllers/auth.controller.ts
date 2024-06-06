import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../../application/dto/login.dto';
// import { RegisterDto } from './dto/register.dto';
import { AuthService } from '../../domain/services/auth.service';
import { Get } from '@nestjs/common';
import { Role } from '../../../common/enums/role.enum';
import { Auth } from '../../../auth/application/Decorators/auth.decorator';
import { ActiveUser } from '../../../common/decorators/activeUser.decorator';
import { UserActiveInterface } from '../../../common/interfaces/userActive.interface';

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
  async profile(@ActiveUser() user: UserActiveInterface) {
    const { email, role } = user;
    return await this.authService.profile({ email, role: role[0] });
  }
}
