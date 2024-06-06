// src/servers/interfaces/server.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServerService } from '../../application/server/server.service';
import { Server } from '../../domain/entities/Server';

@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get()
  async findAll(): Promise<Server[]> {
    return this.serverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Server> {
    return this.serverService.findOne(id);
  }

  @Post()
  async create(@Body() server: Server): Promise<Server> {
    return this.serverService.create(server);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() server: Server): Promise<void> {
    return this.serverService.update(id, server);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.serverService.remove(id);
  }
}
