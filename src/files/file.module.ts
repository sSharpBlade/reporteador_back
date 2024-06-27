// file.module.ts
import { Module } from '@nestjs/common';
import { FileController } from './infrastructure/file.controller';
import { FileService } from './domain/file.service';
import { SqlModule } from '../sql/sql.module';
import { TemplateModule } from 'src/template/template.module'; // Importa TemplateModule, no TemplateService

@Module({
  imports: [SqlModule, TemplateModule], // Importa TemplateModule aquí
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
