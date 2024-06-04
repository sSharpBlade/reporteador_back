import { Column, Entity, Index, OneToMany } from "typeorm";
import { MenuPermission } from "./MenuPermission";

// @Index("permission_pkey", ["idPermissions"], { unique: true })
@Entity("permission", { schema: "public" })
export class Permission {
  @Column("integer", { primary: true, name: "id_permissions" })
  idPermissions: number;

  @Column("character varying", { name: "function" })
  function: string;

  @OneToMany(
    () => MenuPermission,
    (menuPermission) => menuPermission.idPermissions
  )
  menuPermissions: MenuPermission[];
}
