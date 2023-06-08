import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentSchema } from './enrollment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Enrollment', schema: EnrollmentSchema },
    ]),
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
