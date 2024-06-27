import { Column, Entity, OneToMany } from 'typeorm';
import { RoleUser } from './RoleUser.entity';

// @Index("role_pkey", ["idRole"], { unique: true })
@Entity('role', { schema: 'public' })
export class Role {
  @Column('integer', { primary: true, name: 'id_role' })
  idRole: number;

  @Column('character varying', { name: 'name_role' })
  nameRole: string;

  // @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.idRole)
  // roleMenus: RoleMenu[];

  @OneToMany(() => RoleUser, (roleUser) => roleUser.idRole)
  roleUsers: RoleUser[];
}
