import { IsNumber, IsString } from 'class-validator';

export class FileDto {
  @IsNumber()
  connectionId: number;
  @IsString()
  query: string;
  @IsNumber()
  templateId: number;
}
