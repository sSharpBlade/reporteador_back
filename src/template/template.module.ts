import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './infrastructure/template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/common/entities/Template';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
