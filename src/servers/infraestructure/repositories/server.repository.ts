// src/servers/infrastructure/repositories/server.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from '../../domain/entities/Server';

@Injectable()
export class ServerRepository {
  constructor(
    @InjectRepository(Server)
    private readonly serverRepo: Repository<Server>,
  ) {}

  async findAll(): Promise<Server[]> {
    return this.serverRepo.find();
  }

  async findOne(id: number): Promise<Server> {
    return this.serverRepo.findOne({ where: { idServer: id } });
  }

  async create(server: Server): Promise<Server> {
    return this.serverRepo.save(server);
  }

  async update(id: number, server: Server): Promise<void> {
    await this.serverRepo.update(id, server);
  }

  async remove(id: number): Promise<void> {
    await this.serverRepo.delete(id);
  }
}
