// file.module.ts
import { Module } from '@nestjs/common';
import { FileController } from './infrastructure/file.controller';
import { FileService } from './domain/file.service';
import { SqlModule } from '../sql/sql.module';
import { TemplateModule } from '../template/template.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SqlModule, TemplateModule, AuthModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
