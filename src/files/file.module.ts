// file.module.ts
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SqlModule } from 'src/sql/sql.module';
import { TemplateModule } from 'src/template/template.module'; // Importa TemplateModule, no TemplateService

@Module({
  imports: [SqlModule, TemplateModule], // Importa TemplateModule aquí
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}