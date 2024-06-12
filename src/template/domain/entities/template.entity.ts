import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TemplateDetail } from './template-detail.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  idTemplate: number;

  @Column()
  name: string;

  @Column()
  idQuery: number;

  @OneToMany(() => TemplateDetail, templateDetail => templateDetail.template, { cascade: true })
  details: TemplateDetail[];
}
