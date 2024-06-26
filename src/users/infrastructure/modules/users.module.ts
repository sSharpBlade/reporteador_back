import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../../domain/services/users.service';
import { Users } from '../../../common/entities/Users';
import { Role } from '../../../common/entities/Role';
import { Menu } from '../../../common/entities/Menu';
import { RoleMenu } from '../../../common/entities/RoleMenu';
import { Permission } from '../../../common/entities/Permission';
import { MenuPermission } from '../../../common/entities/MenuPermission';
import { AuthModule } from '../../../auth/infrastructure/Modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Role,
      Menu,
      RoleMenu,
      Permission,
      MenuPermission,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
