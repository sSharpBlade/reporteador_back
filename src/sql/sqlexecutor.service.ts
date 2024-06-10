import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Connection } from 'typeorm';

@Injectable()
export class SqlExecutorService {
  constructor(private readonly databaseService: DatabaseService) {}

  async executeQuery(connectionId: number, query: string): Promise<any> {
    const connection: Connection =
      await this.databaseService.getDatabaseConnection(connectionId);

    try {
      const result = await connection.query(query);
      const columns = result[0] ? Object.keys(result[0]) : [];

      return { columns, rows: result };
    } finally {
      await connection.close();
    }
  }
}
