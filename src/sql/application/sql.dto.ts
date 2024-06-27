import { IsNumber, IsString } from 'class-validator';

export class SqlDto {
  @IsNumber()
  connectionId: number;

  @IsString()
  query: string;
}
