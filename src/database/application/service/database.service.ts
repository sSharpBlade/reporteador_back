// src/servers/application/server.service.ts

import { Injectable } from '@nestjs/common';
import { ServerRepository } from '../../infraestructure/repositories/database.repository';
import { DatabaseConnection } from '../../domain/entities/database.entity';
import { UpdateServerDto } from '../dto/update-database.dto';

@Injectable()
export class ServerService {
  constructor(private readonly serverRepository: ServerRepository) {}

  async findAll(): Promise<DatabaseConnection[]> {
    return this.serverRepository.findAll();
  }

  async findOne(id: number): Promise<DatabaseConnection> {
    return this.serverRepository.findOne(id);
  }

  async create(server:DatabaseConnection): Promise<DatabaseConnection> {
    return this.serverRepository.create(server);
  }

  async update(id: number, updateServerDto: UpdateServerDto): Promise<DatabaseConnection> {
    const server = await this.findOne(id);
    Object.assign(server, updateServerDto);
    return this.serverRepository.save(server);
    
  }

  async remove(id: number): Promise<void> {
    return this.serverRepository.remove(id);
  }
}
