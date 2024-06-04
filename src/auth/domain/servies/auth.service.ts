import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/domain/services/users.service';
import { LoginDto } from '../../application/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // async register({ username, email, password }: RegisterDto) {
  //   const user = await this.usersService.findOneByEmail(email);
  //   if (user) {
  //     throw new BadRequestException('User already exists');
  //   }
  //   return await this.usersService.create({
  //     username,
  //     email,
  //     password: await bcryptjs.hash(password, 10),
  //   });
  // }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    // const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!password) {
      throw new UnauthorizedException('Invalid password');
    }

    const roles = user.roleUsers.map((roleUser) => roleUser.idRole.nameRole);

    const payload = { email: user.email, roles };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: user.email,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    // if (role !== 'ADMIN') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to access this resource',
    //   );
    // }
    return await this.usersService.findOneByEmail(email);
  }
}
