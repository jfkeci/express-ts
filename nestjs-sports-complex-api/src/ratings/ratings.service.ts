import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Model } from 'mongoose'
import { Rating } from './rating.model';

@Injectable()
export class RatingsService {
  constructor(@InjectModel('Rating') private readonly ratingModel: Model<Rating>) { }
  create(createRatingDto: CreateRatingDto) {
    return 'This action adds a new rating';
  }

  findAll() {
    return `This action returns all ratings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
