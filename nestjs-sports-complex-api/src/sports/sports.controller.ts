import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportDTO } from './dto/sport.dto';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) { }

  @Post()
  create(@Body() dto: SportDTO) {
    return this.sportsService.create(dto);
  }

  @Get()
  findAll() {
    return this.sportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: SportDTO) {
    return this.sportsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportsService.remove(id);
  }
}
