import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Server } from "../servers/domain/entities/server.entity";
import { Template } from "./template.entity";

@Index("query_pkey", ["idQuery"], { unique: true })
@Entity("query", { schema: "public" })
export class Query {
  @Column("integer", { primary: true, name: "id_query" })
  idQuery: number;

  @Column("character varying", { name: "sentence" })
  sentence: string;

  @ManyToOne(() => Server, (server) => server.queries)
  @JoinColumn([{ name: "id_server", referencedColumnName: "idServer" }])
  idServer: Server;

  @OneToMany(() => Template, (template) => template.idQuery)
  templates: Template[];
}
