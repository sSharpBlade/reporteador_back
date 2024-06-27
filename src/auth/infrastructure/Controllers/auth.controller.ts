import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../../application/dto/login.dto';
// import { RegisterDto } from './dto/register.dto';
import { AuthService } from '../../domain/services/auth.service';
import { Get } from '@nestjs/common';
import { ActiveUser } from '../../../common/decorators/activeUser.decorator';
import { UserActiveInterface } from '../../../common/interfaces/userActive.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../application/Decorators/auth.decorator';

@ApiTags('Auth')
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

  @ApiBearerAuth()
  @Get('profile')
  @Auth()
  async profile(@ActiveUser() user: UserActiveInterface) {
    const { email } = user;
    return await this.authService.profile({ email });
  }
}
