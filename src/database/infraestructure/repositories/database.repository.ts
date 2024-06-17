// src/servers/infrastructure/repositories/server.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseConnection } from '../../domain/entities/database.entity';

@Injectable()
export class ServerRepository {
  constructor(
    @InjectRepository(DatabaseConnection)
    private readonly serverRepo: Repository<DatabaseConnection>,
  ) {}

  async findAll(): Promise<DatabaseConnection[]> {
    return this.serverRepo.find();
  }

  async findOne(id: number): Promise<DatabaseConnection> {
    return this.serverRepo.findOne({ where: { id: id } });
  }

  async create(server: DatabaseConnection): Promise<DatabaseConnection> {
    return this.serverRepo.save(server);
  }

  async update(id: number, server: DatabaseConnection): Promise<void> {
    await this.serverRepo.update(id, server);
  }

  async remove(id: number): Promise<void> {
    await this.serverRepo.delete(id);
  }

  async save(server: DatabaseConnection): Promise<DatabaseConnection> {
    return this.serverRepo.save(server);
  }
}

