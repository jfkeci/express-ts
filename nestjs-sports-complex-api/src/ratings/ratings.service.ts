import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Model } from 'mongoose'
import { Rating } from './rating.model';
import { validateId } from 'src/utils/validation.utils';

@Injectable()
export class RatingsService {
  constructor(@InjectModel('Rating') private readonly ratingModel: Model<Rating>) { }

  async create(createRatingDto: CreateRatingDto) {
    try {
      const { text, rating, classId } = createRatingDto;

      validateId(classId);

      const newRating = await new this.ratingModel({
        text,
        rating,
        classId
      }).save()

      if (!newRating) throw new HttpException('Couldn\'t create rating', 400);

      return newRating;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
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
