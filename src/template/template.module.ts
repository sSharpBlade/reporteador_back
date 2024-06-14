import { Module } from '@nestjs/common';
import { TemplateController } from './infrastructure/controllers/template/template.controller';
import { TemplateService } from './application/template.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService]
})
export class TemplateModule {}
