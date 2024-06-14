export class CreateTemplateDto {
    name: string;
    idQuery: number;
    templateDetails: Array<{ field: string; typeField: string }>;
  }
  