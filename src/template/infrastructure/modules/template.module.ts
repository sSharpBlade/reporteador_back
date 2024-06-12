import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '../../domain/entities/template.entity';
import { TemplateDetail } from '../../domain/entities/template-detail.entity';
import { TemplateService } from '../../application/services/template.service';
import { TemplateController } from '../controllers/controllers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateDetail])],
  providers: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}
