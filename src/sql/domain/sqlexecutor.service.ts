import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/domain/database.service';
import { Connection } from 'typeorm';
import { SqlService } from './sql.service';

@Injectable()
export class SqlExecutorService {
  constructor(private readonly databaseService: DatabaseService, private readonly sqlService:SqlService) {}

  async executeQuery(
    connectionId: number,
    query: string,
  ): Promise<{ columns: string[]; rows: any[] }> {

    if (!query.trim().toUpperCase().startsWith('SELECT')) {
      throw new Error('Solo consultas SELECT')
    }

    const connection: Connection =
      await this.databaseService.getDatabaseConnection(connectionId);

    try {
      const result = await connection.query(query);
      const columns = result[0] ? Object.keys(result[0]) : [];
      this.sqlService.create(query);
      return { columns, rows: result };
    } finally {
      await connection.close();
    }
  }
}