import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
    confirmationCode: string;

    @Prop({})
    passwordResetCode: string;

    @Prop({})
    verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);