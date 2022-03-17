import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SportDTO } from './dto/sport.dto';
import { Sport } from './sport.model';
import { Model } from 'mongoose';

@Injectable()
export class SportsService {

  constructor(@InjectModel('Sport') private readonly sportModel: Model<Sport>) { }

  async create(dto: SportDTO): Promise<Sport | void> {
    try {
      const { name } = dto;

      const sport = this.findByName(name);

      if (sport) throw new HttpException('Sport already exists', 409);

      const newSport = new this.sportModel({
        name: name
      }).save();

      if (!newSport) throw new HttpException('Something went wrong', 400);

      return newSport;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  findAll() {
    return `This action returns all sports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sport`;
  }

  update(id: number, dto: SportDTO) {
    return `This action updates a #${id} sport`;
  }

  remove(id: number) {
    return `This action removes a #${id} sport`;
  }

  async findByName(name: string): Promise<Sport> {
    try {
      const sport = this.sportModel.findOne({ name: name });

      return sport;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }
}
