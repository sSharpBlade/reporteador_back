import { PartialType } from "@nestjs/swagger";
import { CreateServerDto } from "./create-database.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateServerDto {
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
  @IsString()
  ssl: boolean;
  }