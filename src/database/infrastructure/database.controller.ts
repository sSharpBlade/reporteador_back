import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from '../domain/database.service';
import { CreateDataBaseDto } from '../application/create-database.dto';
import { UpdateDataBaseDto } from '../application/update-database.dto';

@Controller('database')
@ApiTags('DataBase')
@ApiBearerAuth()
export class DatabaseController {
    constructor (private readonly dataBaseService:DatabaseService){}

  @Post()
  create(@Body() createDataBaseDto: CreateDataBaseDto) {
    return this.dataBaseService.create(createDataBaseDto);
  }

  @Get()
  findAll() {
    return this.dataBaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dataBaseService.getConnection(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataBaseDto: UpdateDataBaseDto,
  ) {
    return this.dataBaseService.update(+id, updateDataBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataBaseService.remove(+id);
  }
}
