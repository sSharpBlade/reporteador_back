import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from '../application/dto/create-template.dto';
import { UpdateTemplateDto } from '../application/dto/update-template.dto';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Template } from '../../common/entities/Template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto) {
    const template = this.templateRepository.create(createTemplateDto);
    return await this.templateRepository.save(template);
  }

  async getTemplate(id: number): Promise<Template> {
    return this.templateRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.templateRepository.find();
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return await this.templateRepository.update(id, updateTemplateDto);
  }

  async remove(id: number) {
    return await this.templateRepository.softDelete(id);
  }
}
