// src/servers/servers.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './domain/entities/Server';
import { ServerRepository } from './infraestructure/repositories/server.repository';
import { ServerService } from './application/server/server.service';
import { ServerController } from './infraestructure/controllers/server.controller';



@Module({
  imports: [TypeOrmModule.forFeature([Server])],
  providers: [ServerRepository, ServerService],
  controllers: [ServerController],
})
export class ServersModule {}
