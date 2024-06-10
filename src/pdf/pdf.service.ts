import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit-table');

import * as ExcelJS from 'exceljs';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx';

@Injectable()
export class PdfService {
  async generarPDF(columns: string[], rows: any[]): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
        autoFirstPage: false,
      });

      let pageNumber = 0;
      doc.on('pageAdded', () => {
        pageNumber++;
        doc
          .moveTo(50, 55)
          .lineTo(doc.page.width - 50, 55)
          .stroke();

        const bottom = doc.page.margins.bottom;

        doc.page.margins.bottom = 0;
        doc.text(
          'Pag. ' + pageNumber,
          (doc.page.width - 100) * 0.5,
          doc.page.height - 50,
          {
            width: 100,
            align: 'center',
            lineBreak: false,
          },
        );
        doc.page.margins.bottom = bottom;
      });

      doc.addPage();
      doc.text('', 50, 100);
      doc.text('PDF Generado en nuestro servidor');
      doc.moveDown();
      doc.text('Esto es un ejemplo de como generar un pdf en nuestro servidor');

      const table = {
        title: 'Resultado de la Consulta SQL',
        headers: columns,
        rows: rows.map((row) => columns.map((col) => row[col])),
      };

      doc.table(table, { columnSize: columns.map(() => 150) });

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }

  async generateExcel(columns: string[], rows: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

    worksheet.columns = columns.map((col) => ({ header: col, key: col }));
    rows.forEach((row) => worksheet.addRow(row));

    const buffer: any = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async generateWord(columns: string[], rows: any[]): Promise<Buffer> {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: 'Resultado de la Consulta SQL',
              heading: 'Heading1',
            }),
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              rows: [
                new TableRow({
                  children: columns.map(
                    (col) => new TableCell({ children: [new Paragraph(col)] }),
                  ),
                }),
                ...rows.map(
                  (row) =>
                    new TableRow({
                      children: columns.map(
                        (col) =>
                          new TableCell({
                            children: [new Paragraph(row[col])],
                          }),
                      ),
                    }),
                ),
              ],
            }),
          ],
        },
      ],
    });

    const buffer: Buffer = await Packer.toBuffer(doc);
    return buffer;
  }
}
