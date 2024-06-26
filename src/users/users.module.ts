import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UsersService } from './domain/services/users.service';
import { Users } from '../common/entities/Users';
import { RoleUser } from '../common/entities/RoleUser';
import { Role } from '../common/entities/Role';
import { AuthModule } from 'src/auth/auth.module';
import { Query } from 'src/common/entities/Query';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, RoleUser, Role, Query]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
