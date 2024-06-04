import { Column, Entity, Index, OneToMany } from 'typeorm';
import { MenuPermission } from './MenuPermission';
import { RoleMenu } from './RoleMenu';

// @Index("menu_pkey", ["idMenu"], { unique: true })
@Entity('menu', { schema: 'public' })
export class Menu {
  @Column('integer', { primary: true, name: 'id_menu' })
  idMenu: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @OneToMany(() => MenuPermission, (menuPermission) => menuPermission.idMenu)
  menuPermissions: MenuPermission[];

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.idMenu)
  roleMenus: RoleMenu[];
}
