import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDoc extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 }
}, { timestamps: true })

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserDoc;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const User = mongoose.model<UserDoc>('User', userSchema)

export default User