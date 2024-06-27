import { PartialType } from '@nestjs/swagger';
import { CreateDataBaseDto } from './create-database.dto';

export class UpdateDataBaseDto extends PartialType(CreateDataBaseDto) {}