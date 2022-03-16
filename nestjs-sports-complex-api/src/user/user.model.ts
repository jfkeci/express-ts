import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import * as bcrypt from 'bcrypt'

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
    },
    verificationCode: {
        type: String,
        default: () => nanoid()
    },
    passwordResetCode: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })

export interface User extends Document {
    _id: string;
    email: string;
    name: string;
    password: string;
    role: string;
    verificationCode: string;
    passwordResetCode: string;
    verified: boolean;
}

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
}