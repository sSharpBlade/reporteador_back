import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseConnection } from '../../common/entities/database.entity';
import { createConnection, Connection } from 'typeorm';
import { CreateDataBaseDto } from '../application/create-database.dto';
import { UpdateDataBaseDto } from '../application/update-database.dto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(DatabaseConnection)
    private readonly connectionRepository: Repository<DatabaseConnection>,
  ) {}

  async getDatabaseConnection(id: number): Promise<Connection> {
    const connectionInfo = await this.connectionRepository.findOneBy({ id });

    if (!connectionInfo) {
      throw new Error('Connection not found');
    }

    return createConnection({
      name: `dynamic_connection_${id}`,
      type: connectionInfo.type as 'postgres' | 'mysql',
      host: connectionInfo.host,
      port: connectionInfo.port,
      username: connectionInfo.username,
      password: connectionInfo.password,
      database: connectionInfo.database,
      synchronize: true,
      ssl: connectionInfo.ssl as false | true,
    });
  }

  async create(createDatabaseDto: CreateDataBaseDto) {
    const connection = this.connectionRepository.create(createDatabaseDto);
    return await this.connectionRepository.save(connection);
  }

  async getConnection(id: number): Promise<DatabaseConnection> {
    return this.connectionRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.connectionRepository.find();
  }

  async update(id: number, updateDataBaseDto: UpdateDataBaseDto) {
    return await this.connectionRepository.update(id, updateDataBaseDto);
  }

  async remove(id: number) {
    return await this.connectionRepository.softDelete(id);
  }

}
