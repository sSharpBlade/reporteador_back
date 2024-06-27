import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Server } from './Server';
// import { Template } from './Template';

// @Index("query_pkey", ["idQuery"], { unique: true })
@Entity('query', { schema: 'public' })
export class Query {
  @PrimaryGeneratedColumn()
  idQuery: number;

  @Column('character varying', { name: 'sentence' })
  sentence: string;

  // @ManyToOne(() => Server, (server) => server.queries)
  // @JoinColumn([{ name: 'id_server', referencedColumnName: 'idServer' }])
  // idServer: Server;

  // @OneToMany(() => Template, (template) => template.idQuery)
  // templates: Template[];
}
