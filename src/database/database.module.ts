// src/servers/servers.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnection } from './domain/entities/database.entity';
import { ServerRepository } from './infraestructure/repositories/database.repository';
import { ServerService } from './application/service/database.service';
import { ServerController } from './infraestructure/controllers/database.controller';



@Module({
  imports: [TypeOrmModule.forFeature([DatabaseConnection])],
  providers: [ServerRepository, ServerService],
  controllers: [ServerController],
})
export class ServersModule {}
