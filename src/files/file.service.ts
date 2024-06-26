import { Injectable } from '@nestjs/common';
import { TemplateService } from 'src/template/template.service';
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
  Header,
} from 'docx';
import logo from 'src/common/logo';

@Injectable()
export class FileService {
  constructor(private readonly templateService: TemplateService) {}

  async generatePDF(
    columns: string[],
    rows: any[],
    templateId: number,
  ): Promise<Buffer> {
    const templateData = await this.templateService.getTemplate(templateId);

    if (!templateData) {
      throw new Error(`Template with id ${templateId} not found`);
    }

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
        autoFirstPage: false,
      });

      if (templateData.logo == null) {
        templateData.logo = logo;
      }

      let pageNumber = 0;
      doc.on('pageAdded', () => {
        pageNumber++;
        doc.image(templateData.logo, 50, 5, {
          fit: [45, 45],
          align: 'center',
        });

        doc
          .moveTo(50, 55)
          .lineTo(doc.page.width - 50, 55)
          .stroke();

        doc.text('', 50, 15);
        doc.fontSize(20).text(templateData.title, { align: 'center' });
        doc.text('', 50, 40);
        doc.fontSize(10).text(templateData.description, { align: 'center' });

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

      doc.text('', 50, 75);
      const table = {
        headers: columns,
        rows: rows.map((row) =>
          columns.map((col) =>
            row[col] !== null && row[col] !== undefined ? row[col] : '',
          ),
        ),
      };

      doc.table(table);

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
    rows.forEach((row) => {
      const sanitizedRow = columns.map((col) =>
        row[col] !== null && row[col] !== undefined ? row[col] : '',
      );
      worksheet.addRow(sanitizedRow);
    });

    const buffer: any = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async generateWord(
    columns: string[],
    rows: any[],
    templateId: number,
  ): Promise<Buffer> {
    const templateData = await this.templateService.getTemplate(templateId);

    if (!templateData) {
      throw new Error(`Template with id ${templateId} not found`);
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  text: templateData.title,
                  heading: 'Heading1',
                  alignment: 'center',
                }),
                new Paragraph({
                  text: templateData.description,
                  alignment: 'center',
                }),
              ],
            }),
          },
          children: [
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
                      children: columns.map((col) => {
                        let value = row[col];
                        if (value === null || value === undefined) {
                          value = '';
                        } else if (typeof value !== 'string') {
                          value = String(value);
                        }
                        return new TableCell({
                          children: [new Paragraph(value)],
                        });
                      }),
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
