import { EntityRepository, Repository } from 'typeorm';
import { TemplateDetail } from '../../domain/entities/template-detail.entity';

@EntityRepository(TemplateDetail)
export class TemplateDetailRepository extends Repository<TemplateDetail> {}
