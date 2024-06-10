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
}
