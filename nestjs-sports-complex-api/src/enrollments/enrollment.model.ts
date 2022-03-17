import mongoose from 'mongoose';

export const EnrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    classId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export interface Enrollment extends Document {
  userId: string;
  classId: string;
}
