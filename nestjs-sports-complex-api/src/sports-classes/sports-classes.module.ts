import { Module } from '@nestjs/common';
import { SportsClassesService } from './sports-classes.service';
import { SportsClassesController } from './sports-classes.controller';

@Module({
  controllers: [SportsClassesController],
  providers: [SportsClassesService]
})
export class SportsClassesModule {}
