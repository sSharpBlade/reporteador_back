import { IsString, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateTemplateDetailDto {
  @IsString()
  field: string;

  @IsString()
  typeField: string;
}

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsInt()
  idQuery: number;

  @ValidateNested({ each: true })
  @Type(() => CreateTemplateDetailDto)
  details: CreateTemplateDetailDto[];
}
