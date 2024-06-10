import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnection } from 'src/database/database.entity';
import { DatabaseService } from 'src/database/database.service';
import { SqlExecutorService } from './sqlexecutor.service';
import { SqlController } from './sql.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseConnection])],
  providers: [DatabaseService, SqlExecutorService],
  controllers: [SqlController],
})
export class SqlModule {}
