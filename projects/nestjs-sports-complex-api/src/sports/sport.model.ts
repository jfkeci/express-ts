import mongoose from 'mongoose';

export const SportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export interface Sport extends Document {
  name: string;
}
