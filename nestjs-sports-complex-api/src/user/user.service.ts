import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './user.model';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<User> {
        const newUser = await new this.userModel({
            name,
            email,
            password,
            role
        }).save();

        return newUser;
    }

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find();

        return users;
    }

    async findById(_id: string): Promise<User | null> {
        const user = await this.userModel.findOne({ _id });

        if (!user) return null;

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email });

        if (!user) return null;

        return user;
    }



    async delete(_id: string): Promise<boolean> {
        const deletedUser = await this.userModel.findByIdAndRemove(_id);

        if (!deletedUser) return false;

        return true;
    }
}
