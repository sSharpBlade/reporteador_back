/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SqlModule } from 'src/sql/sql.module';

@Module({
  imports: [SqlModule],
  controllers: [FileController],
  providers: [FileService],
})
export class PdfModule {}
