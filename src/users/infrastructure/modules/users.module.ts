import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../../domain/services/users.service';
import { Users } from 'src/common/entities/Users';
import { RoleUser } from 'src/common/entities/RoleUser';
import { Role } from 'src/common/entities/Role';
import { Menu } from 'src/common/entities/Menu';
import { RoleMenu } from 'src/common/entities/RoleMenu';
import { Permission } from 'src/common/entities/Permission';
import { MenuPermission } from 'src/common/entities/MenuPermission';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      RoleUser,
      Role,
      Menu,
      RoleMenu,
      Permission,
      MenuPermission,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
