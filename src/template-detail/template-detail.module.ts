import { Module } from '@nestjs/common';
import { TemplateDetailController } from './infrastructure/controllers/template-detail/template-detail.controller';
import { TemplateDetailService } from './application/template-detail/template-detail.service';

@Module({
  controllers: [TemplateDetailController],
  providers: [TemplateDetailService]
})
export class TemplateDetailModule {}
