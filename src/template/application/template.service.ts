import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Template } from '../domain/entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    // Transforma createTemplateDto a un objeto DeepPartial<Template>
    const template: DeepPartial<Template> = {
      name: createTemplateDto.name,
      idQuery: { idQuery: createTemplateDto.idQuery }, // Ajusta según la estructura de idQuery
      // Asegúrate de manejar correctamente templateDetails si es necesario
      templateDetails: createTemplateDto.templateDetails?.map(detail => ({ ...detail })),
    };
  
    // Crea la instancia de Template
    const newTemplate = this.templateRepository.create(template);
  
    // Guarda el nuevo Template en la base de datos
    return this.templateRepository.save(newTemplate);
  }
  

  async findAll(): Promise<Template[]> {
    return this.templateRepository.find();
  }

  async findOne(id: number): Promise<Template> {
    return this.templateRepository.findOne({ where: { idTemplate: id } });
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto): Promise<void> {
    // Extrae las propiedades del DTO para actualizar el Template
    const { idQuery, ...rest } = updateTemplateDto;

    // Construye un objeto DeepPartial<Template> para realizar la actualización
    const templatePartial: Partial<Template> = {
      ...rest, // Copia las demás propiedades del DTO
      idQuery: { idQuery }, // Ajusta según la estructura de idQuery
    };

    // Realiza la actualización en la base de datos
    await this.templateRepository.update(id, templatePartial);
  }

  async remove(id: number): Promise<void> {
    await this.templateRepository.delete(id);
  }
}
