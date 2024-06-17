import { IsNumber, IsString } from "class-validator";

// create-server.dto.ts
export class CreateServerDto {
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

    // Otros campos necesarios para crear un servidor
  }
  