import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportsClassesService } from './sports-classes.service';
import { CreateSportsClassDto } from './dto/create-sports-class.dto';
import { UpdateSportsClassDto } from './dto/update-sports-class.dto';

@Controller('sports-classes')
export class SportsClassesController {
  constructor(private readonly sportsClassesService: SportsClassesService) {}

  @Post()
  create(@Body() createSportsClassDto: CreateSportsClassDto) {
    return this.sportsClassesService.create(createSportsClassDto);
  }

  @Get()
  findAll() {
    return this.sportsClassesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportsClassesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSportsClassDto: UpdateSportsClassDto) {
    return this.sportsClassesService.update(+id, updateSportsClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportsClassesService.remove(+id);
  }
}
