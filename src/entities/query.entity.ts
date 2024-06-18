import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { DatabaseConnection } from "../database/domain/entities/database.entity";
import { Template } from "./template.entity";

@Index("query_pkey", ["idQuery"], { unique: true })
@Entity("query", { schema: "public" })
export class Query {
  @Column("integer", { primary: true, name: "id_query" })
  idQuery: number;

  @Column("character varying", { name: "sentence" })
  sentence: string;

 // @ManyToOne(() => DatabaseConnection, (server) => server.queries)
  //@JoinColumn([{ name: "id_server", referencedColumnName: "idServer" }])
  //idServer: DatabaseConnection;

  @OneToMany(() => Template, (template) => template.idQuery)
  templates: Template[];
}
