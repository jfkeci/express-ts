import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';
import { SportSchema } from './sport.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Sport', schema: SportSchema }
    ])
  ],
  controllers: [SportsController],
  providers: [SportsService]
})
export class SportsModule { }
