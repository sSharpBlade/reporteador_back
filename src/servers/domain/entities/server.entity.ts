import { Column, Entity, Index, OneToMany } from "typeorm";
import { Query } from "../../../entities/query.entity";

@Index("server_pkey", ["idServer"], { unique: true })
@Entity("server", { schema: "public" })
export class Server {
  @Column("integer", { primary: true, name: "id_server" })
  idServer: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "url" })
  url: string;

  @Column("character varying", { name: "users" })
  users: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("character varying", { name: "type" })
  type: string;

  @OneToMany(() => Query, (query) => query.idServer)
  queries: Query[];
}
