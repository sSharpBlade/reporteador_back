import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../../../users/infrastructure/modules/users.module';
import { AuthController } from '../Controllers/auth.controller';
import { AuthService } from '../../domain/services/auth.service';
import { jwtConstants } from '../../application/constants/jwt.constant';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthModule],
})
export class AuthModule {}
