import { IsBase64, IsOptional, IsString } from "class-validator";

export class CreateTemplateDto {

    @IsString()
    title: string;

    @IsString()
    description:string;

    @IsBase64()
    @IsOptional()
    logo:string;
    
}
