import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SportDTO } from './dto/sport.dto';
import { Sport } from './sport.model';
import { Model } from 'mongoose';
import { validateId } from 'src/utils/validation.utils';
import { isFullWidth } from 'class-validator';

@Injectable()
export class SportsService {
  constructor(
    @InjectModel('Sport') private readonly sportModel: Model<Sport>,
  ) {}

  async create(dto: SportDTO): Promise<Sport | void> {
    try {
      const { name } = dto;

      const sport = await this.findByName(name);

      if (sport) throw new HttpException('Sport already exists', 409);

      const newSport = new this.sportModel({
        name: name,
      }).save();

      if (!newSport) throw new HttpException('Something went wrong', 400);

      return newSport;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<Sport[] | void> {
    try {
      const sports = await this.sportModel.find();

      if (!sports) throw new HttpException('No sports found', 404);

      return sports;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(_id: string): Promise<Sport | void> {
    try {
      validateId(_id);

      const sport = await this.sportModel.findOne({ _id });

      if (!sport) throw new HttpException('No sport found', 404);

      return sport;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(_id: string, dto: SportDTO) {
    try {
      validateId(_id);

      const sport = await this.sportModel.findOne({ _id });

      if (!sport) throw new HttpException('Sport not found', 404);

      if (sport && dto.name) sport.name = dto.name;

      await sport.save();

      return sport;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(_id: string) {
    try {
      validateId(_id);

      const deletedSport = await this.sportModel.findByIdAndRemove(_id);

      if (!deletedSport) throw new HttpException('Something went wrong', 400);

      return 'Sport successfully deleted';
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByName(name: string): Promise<Sport> {
    try {
      const sport = await this.sportModel.findOne({ name: name });

      return sport;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }
}
