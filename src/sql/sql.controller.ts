import { Controller, Post, Body } from '@nestjs/common';
import { SqlExecutorService } from './sqlexecutor.service';

@Controller('sql')
export class SqlController {
  constructor(private readonly sqlExecutorService: SqlExecutorService) {}

  @Post('execute')
  async executeSql(
    @Body() body: { connectionId: number; query: string },
  ): Promise<any> {
    const { connectionId, query } = body;
    return this.sqlExecutorService.executeQuery(connectionId, query);
  }
}
