import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseConnection } from '../common/entities/database.entity';
import { createConnection, Connection } from 'typeorm';

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
}
