import { Module } from '@nestjs/common';
import { TemplateService } from './domain/template.service';
import { TemplateController } from './infrastructure/template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '../common/entities/Template.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Template]), AuthModule],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
