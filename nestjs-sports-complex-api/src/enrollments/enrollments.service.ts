import { HttpException, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './enrollment.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel('Enrollment') private readonly enrollmentModel: Model<Enrollment>
  ) { }

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment | void> {
    const { userId, classId } = createEnrollmentDto;

    const enrollment = await this.enrollmentModel.create({
      userId: userId,
      classId: classId
    })

    if (!enrollment) throw new HttpException('Something went wrong', 400);

    return enrollment;
  }

  async findAll(): Promise<Enrollment[] | void> {
    const enrollments = await this.enrollmentModel.find();

    if (!enrollments) throw new HttpException('No enrollments found', 404);

    return enrollments;
  }

  async findOne(_id: string): Promise<Enrollment | void> {
    const enrollment = await this.enrollmentModel.findOne({ _id })

    if (!enrollment) throw new HttpException('No enrollment found', 404);

    return enrollment;
  }

  async update(
    _id: string, updateEnrollmentDto: UpdateEnrollmentDto
  ): Promise<Enrollment | void> {
    try {
      const { userId, classId } = updateEnrollmentDto;

      const enrollment = await this.findOne(_id);

      if (!enrollment) throw new HttpException('No enrollment found', 404);

      enrollment.userId = userId;
      enrollment.classId = classId;

      const updatedEnrollment = await this.enrollmentModel.findByIdAndUpdate(_id, enrollment);

      if (!updateEnrollmentDto) throw new HttpException('Something went wrong', 400);

      return updatedEnrollment;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(_id: string) {
    const deletedEnrollment = await this.enrollmentModel.findByIdAndRemove(_id);

    if (!deletedEnrollment) throw new HttpException('No enrollment found', 404);

    return deletedEnrollment;
  }
}
