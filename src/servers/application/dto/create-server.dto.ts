import { IsString } from "class-validator";

// create-server.dto.ts
export class CreateServerDto {
    @IsString()
    name: string;
    @IsString()
    url: string;
    @IsString()
    users: string;
    @IsString()
    password: string;
    @IsString()
    type: string;

    // Otros campos necesarios para crear un servidor
  }
  