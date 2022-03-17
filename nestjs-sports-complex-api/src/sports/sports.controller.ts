import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportDTO } from './dto/sport.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard, PublicAuthGuard } from 'src/auth/guards/auth-guards';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) { }

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() dto: SportDTO) {
    return this.sportsService.create(dto);
  }

  @Get()
  @UseGuards(PublicAuthGuard)
  findAll() {
    return this.sportsService.findAll();
  }

  @Get(':id')
  @UseGuards(PublicAuthGuard)
  findOne(@Param('id') id: string) {
    return this.sportsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  update(@Param('id') id: string, @Body() dto: SportDTO) {
    return this.sportsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  remove(@Param('id') id: string) {
    return this.sportsService.remove(id);
  }
}
