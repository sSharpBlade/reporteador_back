import { Controller, Post, Body } from '@nestjs/common';
import { SqlExecutorService } from '../domain/sqlexecutor.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SqlDto } from '../application/sql.dto';
import { Auth } from '../../auth/application/Decorators/auth.decorator';

@Controller('sql')
@ApiTags('SQL')
@ApiBearerAuth()
@Auth()
export class SqlController {
  constructor(private readonly sqlExecutorService: SqlExecutorService) {}

  @Post('execute')
  async executeSql(@Body() body: SqlDto): Promise<any> {
    const { connectionId, query } = body;
    return this.sqlExecutorService.executeQuery(connectionId, query);
  }
}
