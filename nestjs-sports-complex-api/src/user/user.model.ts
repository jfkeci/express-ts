import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { nanoid } from "nanoid";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({})
    role: string;

    @Prop({ default: () => nanoid() })
    confirmationCode: string;

    @Prop({})
    passwordResetCode: string;

    @Prop({ default: false })
    verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);