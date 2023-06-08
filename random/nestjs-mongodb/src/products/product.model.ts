import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export interface Product extends mongoose.Document {
    id: string,
    title: string,
    description: string,
    price: number,
}