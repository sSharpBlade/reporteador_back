import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Menu } from "./Menu";
import { Permission } from "./Permission";

@Index("menu_permission_pkey", ["idMenup"], { unique: true })
@Entity("menu_permission", { schema: "public" })
export class MenuPermission {
  @Column("integer", { primary: true, name: "id_menup" })
  idMenup: number;

  @ManyToOne(() => Menu, (menu) => menu.menuPermissions)
  @JoinColumn([{ name: "id_menu", referencedColumnName: "idMenu" }])
  idMenu: Menu;

  @ManyToOne(() => Permission, (permission) => permission.menuPermissions)
  @JoinColumn([
    { name: "id_permissions", referencedColumnName: "idPermissions" },
  ])
  idPermissions: Permission;
}
