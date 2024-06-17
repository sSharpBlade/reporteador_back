// src/servers/interfaces/server.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ServerService } from '../../application/service/database.service';
import { DatabaseConnection } from '../../domain/entities/database.entity';
import { CreateServerDto } from '../../application/dto/create-database.dto'; // Importa el DTO creado
import { UpdateServerDto } from 'src/database/application/dto/update-database.dto';


@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get()
  async findAll(): Promise<DatabaseConnection[]> {
    return this.serverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DatabaseConnection> {
    return this.serverService.findOne(id);
  }

  @Post()
  async create(@Body() createServerDto: CreateServerDto): Promise<DatabaseConnection> {
    try {
      // Crear una instancia de Server y asignar los valores del DTO
      const server = new DatabaseConnection();
      server.host = createServerDto.host;
      server.port = createServerDto.port;
      server.username = createServerDto.username;
      server.password = createServerDto.password;
      server.database = createServerDto.database;
      server.ssl = createServerDto.ssl;
      // Asigna otros valores aquí si es necesario
      
      // Llama al método create del servicio pasando la instancia de Server
      return this.serverService.create(server);
    } catch (error) {
      // Manejo de errores
      throw new HttpException('Could not create server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateServerDto: UpdateServerDto): Promise<DatabaseConnection> {
    return this.serverService.update(id, updateServerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.serverService.remove(id);
  }
}
