import { PartialType } from "@nestjs/swagger";
import { CreateServerDto } from "./create-server.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateServerDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    url?: string;
  
    @IsString()
    @IsOptional()
    users?: string;
  
    @IsString()
    @IsOptional()
    password?: string;
  
    @IsString()
    @IsOptional()
    type?: string;
  }