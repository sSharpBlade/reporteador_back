import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../../domain/entities/template.entity';
import { TemplateDetail } from '../../domain/entities/template-detail.entity';
import { CreateTemplateDto } from '../dto/create-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
    @InjectRepository(TemplateDetail)
    private readonly templateDetailRepository: Repository<TemplateDetail>,
  ) {}

  async createTemplate(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const { details, ...templateData } = createTemplateDto;
    const template = this.templateRepository.create(templateData);

    await this.templateRepository.save(template);

    for (const detailData of details) {
      const detail = this.templateDetailRepository.create({ ...detailData, template: template });
      await this.templateDetailRepository.save(detail);
    }

    return template;
  }

  // Implement other CRUD methods as needed
}
