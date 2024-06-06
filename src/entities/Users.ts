import { Column, Entity, Index, OneToMany } from "typeorm";
import { RoleUser } from "./RoleUser";

@Index("users_pkey", ["idUser"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("integer", { primary: true, name: "id_user" })
  idUser: number;

  @Column("character varying", { name: "username" })
  username: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("boolean", { name: "status_active" })
  statusActive: boolean;

  @OneToMany(() => RoleUser, (roleUser) => roleUser.idUser)
  roleUsers: RoleUser[];
}
