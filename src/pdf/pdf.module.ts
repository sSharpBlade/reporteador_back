/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { SqlModule } from 'src/sql/sql.module';

@Module({
  imports: [SqlModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
