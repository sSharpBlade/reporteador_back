import { Controller, Post, Body } from '@nestjs/common';
import { TemplateService } from '../../application/services/template.service';
import { Template } from '../../domain/entities/template.entity';
import { CreateTemplateDto } from '../../application/dto/create-template.dto';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async createTemplate(@Body() createTemplateDto: CreateTemplateDto): Promise<Template> {
    return this.templateService.createTemplate(createTemplateDto);
  }

  // Define other CRUD routes as needed
}
