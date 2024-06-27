import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnection } from '../common/entities/database.entity';
import { DatabaseService } from '../database/domain/database.service';
import { SqlExecutorService } from './domain/sqlexecutor.service';
import { SqlController } from './infrastructure/sql.controller';
import { AuthModule } from '../auth/auth.module';
import { SqlService } from './domain/sql.service';
import { Query } from '../common/entities/Query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseConnection, Query]), AuthModule],
  providers: [DatabaseService, SqlExecutorService, SqlService],
  controllers: [SqlController],
  exports: [SqlExecutorService],
})
export class SqlModule {}