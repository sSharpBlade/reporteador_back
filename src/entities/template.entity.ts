import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Query } from "./query.entity";
import { TemplateDetail } from "./templateDetail.entity";

@Index("template_pkey", ["idTemplate"], { unique: true })
@Entity("template", { schema: "public" })
export class Template {
  @Column("integer", { primary: true, name: "id_template" })
  idTemplate: number;

  @Column("character varying", { name: "name" })
  name: string;

  @ManyToOne(() => Query, (query) => query.templates)
  @JoinColumn([{ name: "id_query", referencedColumnName: "idQuery" }])
  idQuery: Query;

  @OneToMany(
    () => TemplateDetail,
    (templateDetail) => templateDetail.idTemplate
  )
  templateDetails: TemplateDetail[];
}
