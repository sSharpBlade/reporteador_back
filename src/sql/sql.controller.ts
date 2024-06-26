import { Controller, Post, Body } from '@nestjs/common';
import { SqlExecutorService } from './sqlexecutor.service';
import { ApiTags } from '@nestjs/swagger';
import { SqlDto } from './sql.dto';

@Controller('sql')
@ApiTags('SQL')
export class SqlController {
  constructor(private readonly sqlExecutorService: SqlExecutorService) {}

  @Post('execute')
  async executeSql(@Body() body: SqlDto): Promise<any> {
    const { connectionId, query } = body;
    return this.sqlExecutorService.executeQuery(connectionId, query);
  }
}
