import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Template } from './Template';

// @Index("template_detail_pkey", ["idTemplated"], { unique: true })
@Entity('template_detail', { schema: 'public' })
export class TemplateDetail {
  @Column('integer', { primary: true, name: 'id_templated' })
  idTemplated: number;

  @Column('character varying', { name: 'field' })
  field: string;

  @Column('character varying', { name: 'type_field' })
  typeField: string;

  @ManyToOne(() => Template, (template) => template.templateDetails)
  @JoinColumn([{ name: 'id_template', referencedColumnName: 'idTemplate' }])
  idTemplate: Template;
}
