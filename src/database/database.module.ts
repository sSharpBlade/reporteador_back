import { DatabaseController } from './infrastructure/database.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnection } from '../common/entities/database.entity';
import { DatabaseService } from './domain/database.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseConnection]), AuthModule],
  controllers: [
        DatabaseController, ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
