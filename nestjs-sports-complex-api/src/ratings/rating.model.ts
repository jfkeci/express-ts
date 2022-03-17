import mongoose from 'mongoose'

export const RatingSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            maxLength: 255,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        classId: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

export interface Rating extends Document {
    text: string;
    rating: number;
    classId: string;
}