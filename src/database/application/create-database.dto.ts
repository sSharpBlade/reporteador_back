import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateDataBaseDto{
  @IsString()
  type: string;
  @IsString()
  host: string;
  @IsNumber()
  port: number;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  database: string;
  @IsBoolean()
  ssl: boolean;
}