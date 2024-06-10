import { Controller, Post, Body, Res } from '@nestjs/common';
import { SqlExecutorService } from 'src/sql/sqlexecutor.service';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly sqlExecutorService: SqlExecutorService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  async downloadPDF(
    @Body() body: { connectionId: number; query: string },
    @Res() res,
  ): Promise<void> {
    const { connectionId, query } = body;
    const { columns, rows } = await this.sqlExecutorService.executeQuery(
      connectionId,
      query,
    );
    const buffer = await this.pdfService.generarPDF(columns, rows);

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
    const buffer = await this.pdfService.generateExcel(columns, rows);

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
    @Body() body: { connectionId: number; query: string },
    @Res() res,
  ): Promise<void> {
    const { connectionId, query } = body;
    const { columns, rows } = await this.sqlExecutorService.executeQuery(
      connectionId,
      query,
    );
    const buffer = await this.pdfService.generateWord(columns, rows);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=example.docx',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
