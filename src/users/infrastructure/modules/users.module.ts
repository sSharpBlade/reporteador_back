import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../../domain/services/users.service';
import { Users } from '../../../common/entities/Users';
import { RoleUser } from '../../../common/entities/RoleUser';
import { Role } from '../../../common/entities/Role';
import { Menu } from '../../../common/entities/Menu';
import { RoleMenu } from '../../../common/entities/RoleMenu';
import { Permission } from '../../../common/entities/Permission';
import { MenuPermission } from '../../../common/entities/MenuPermission';

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
