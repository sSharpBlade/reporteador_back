import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnection } from '../common/entities/database.entity';
import { DatabaseService } from '../database/domain/database.service';
import { SqlExecutorService } from './domain/sqlexecutor.service';
import { SqlController } from './infrastructure/sql.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseConnection])],
  providers: [DatabaseService, SqlExecutorService],
  controllers: [SqlController],
  exports: [SqlExecutorService],
})
export class SqlModule {}
