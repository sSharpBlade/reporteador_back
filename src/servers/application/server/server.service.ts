// src/servers/application/server.service.ts

import { Injectable } from '@nestjs/common';
import { ServerRepository } from '../../infraestructure/repositories/server.repository';
import { Server } from '../../domain/entities/Server';

@Injectable()
export class ServerService {
  constructor(private readonly serverRepository: ServerRepository) {}

  async findAll(): Promise<Server[]> {
    return this.serverRepository.findAll();
  }

  async findOne(id: number): Promise<Server> {
    return this.serverRepository.findOne(id);
  }

  async create(server: Server): Promise<Server> {
    return this.serverRepository.create(server);
  }

  async update(id: number, server: Server): Promise<void> {
    return this.serverRepository.update(id, server);
  }

  async remove(id: number): Promise<void> {
    return this.serverRepository.remove(id);
  }
}
