import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('template')
@ApiTags('Template')
@Controller('auth')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.templateService.getTemplate(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templateService.update(+id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateService.remove(+id);
  }
}
