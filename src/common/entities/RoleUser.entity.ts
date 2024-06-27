import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Role } from "./Role.entity";
import { Users } from "./Users.entity";

// @Index("role_user_pkey", ["idRolu"], { unique: true })
@Entity("role_user", { schema: "public" })
export class RoleUser {
  @Column("integer", { primary: true, name: "id_rolu" })
  idRolu: number;

  @ManyToOne(() => Role, (role) => role.roleUsers)
  @JoinColumn([{ name: "id_role", referencedColumnName: "idRole" }])
  idRole: Role;

  @ManyToOne(() => Users, (users) => users.roleUsers)
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}
