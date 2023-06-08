import { getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose"
import { argon2d } from "argon2";
import { nanoid } from "nanoid";

@pre<User>("save", async () => {
    if (!this.isModified("password")) return;

    const hash = await argon2d.hash(this.password)

    this.password = hash;

    return;
})
@modelOptions({
    schemaOptions: { timestamps: true },
    options: { allowMixed: Severity.ALLOW }
})
export class User {
    @prop({ required: true, unique: true })
    email: string;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    password: string;

    @prop({ required: true, default: false })
    verified: boolean;

    @prop({ required: true, default: () => nanoid() })
    verificationCode: string;

    @prop({})
    passwordResetCode: string | null;
}



const UserModel = getModelForClass(User)

export default UserModel;