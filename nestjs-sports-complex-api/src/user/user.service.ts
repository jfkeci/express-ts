import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './user.interface';
import { UserDocument } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    async create(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<UserDocument> {
        const newUser = await new this.userModel({
            name,
            email,
            password,
            role
        }).save();

        return newUser;
    }

    async getAll(): Promise<UserDocument[]> {
        const users = await this.userModel.find();

        return users;
    }

    async findById(_id: string): Promise<UserDocument | null> {
        const user = await this.userModel.findOne({ _id });

        if (!user) return null;

        return user;
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
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
