import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Template } from './template.entity';

@Entity()
export class TemplateDetail {
  @PrimaryGeneratedColumn()
  idTemplateD: number;

  @Column()
  field: string;

  @Column()
  typeField: string;

  @ManyToOne(() => Template, template => template.details)
  template: Template;
}
