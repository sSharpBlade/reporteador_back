import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Menu } from "./Menu";
import { Role } from "./Role";

@Index("role_menu_pkey", ["idRolm"], { unique: true })
@Entity("role_menu", { schema: "public" })
export class RoleMenu {
  @Column("integer", { primary: true, name: "id_rolm" })
  idRolm: number;

  @ManyToOne(() => Menu, (menu) => menu.roleMenus)
  @JoinColumn([{ name: "id_menu", referencedColumnName: "idMenu" }])
  idMenu: Menu;

  @ManyToOne(() => Role, (role) => role.roleMenus)
  @JoinColumn([{ name: "id_role", referencedColumnName: "idRole" }])
  idRole: Role;
}
