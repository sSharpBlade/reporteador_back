// src/servers/interfaces/server.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ServerService } from '../../application/server/server.service';
import { Server } from '../../domain/entities/server.entity';
import { CreateServerDto } from '../../application/dto/create-server.dto'; // Importa el DTO creado


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
  async create(@Body() createServerDto: CreateServerDto): Promise<Server> {
    try {
      // Crear una instancia de Server y asignar los valores del DTO
      const server = new Server();
      server.name = createServerDto.name;
      server.url = createServerDto.url;
      server.password = createServerDto.password;
      server.users = createServerDto.users;
      server.type = createServerDto.type;
      // Asigna otros valores aquí si es necesario
      
      // Llama al método create del servicio pasando la instancia de Server
      return this.serverService.create(server);
    } catch (error) {
      // Manejo de errores
      throw new HttpException('Could not create server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
