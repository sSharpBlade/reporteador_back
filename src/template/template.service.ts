import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Plantilla } from './entities/template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Plantilla)
    private plantillaRepository: Repository<Plantilla>,
  ) {}

  // create(createTemplateDto: CreateTemplateDto) {
  //   return 'This action adds a new template';
  // }

  async getPlantilla(id: number): Promise<Plantilla> {
    return this.plantillaRepository.findOneBy({ id }); // Suponiendo que sólo tienes una plantilla o seleccionando por id
  }

  findAll() {
    return `This action returns all template`;
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  // update(id: number, updateTemplateDto: UpdateTemplateDto) {
  //   return `This action updates a #${id} template`;
  // }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
