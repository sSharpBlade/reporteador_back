import { DatabaseController } from './infrastructure/database.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnection } from 'src/common/entities/database.entity';
import { DatabaseService } from './domain/database.service';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseConnection])],
  controllers: [
        DatabaseController, ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
