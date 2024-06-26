import { Controller, Post, Body, Res } from '@nestjs/common';
import { SqlExecutorService } from 'src/sql/sqlexecutor.service';
import { FileService } from './file.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('file')
@ApiTags('File')
@Controller('auth')
export class FileController {
  constructor(
    private readonly sqlExecutorService: SqlExecutorService,
    private readonly fileService: FileService,
  ) {}

  @Post('pdf')
  async downloadPDF(
    @Body() body: { connectionId: number; query: string; templateId: number },
    @Res() res,
  ): Promise<void> {
    const { connectionId, query, templateId } = body;
    const { columns, rows } = await this.sqlExecutorService.executeQuery(
      connectionId,
      query,
    );
    const buffer = await this.fileService.generatePDF(
      columns,
      rows,
      templateId,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Post('excel')
  async downloadExcel(
    @Body() body: { connectionId: number; query: string },
    @Res() res,
  ): Promise<void> {
    const { connectionId, query } = body;
    const { columns, rows } = await this.sqlExecutorService.executeQuery(
      connectionId,
      query,
    );
    const buffer = await this.fileService.generateExcel(columns, rows);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=example.xlsx',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Post('word')
  async downloadWord(
    @Body() body: { connectionId: number; query: string; templateId },
    @Res() res,
  ): Promise<void> {
    const { connectionId, query, templateId } = body;
    const { columns, rows } = await this.sqlExecutorService.executeQuery(
      connectionId,
      query,
    );
    const buffer = await this.fileService.generateWord(
      columns,
      rows,
      templateId,
    );

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=example.docx',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
