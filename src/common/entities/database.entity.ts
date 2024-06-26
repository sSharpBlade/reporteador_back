import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DatabaseConnection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  database: string;

  @Column({ default: false })
  ssl: boolean;
}
