import { HttpCode, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isValidId } from 'src/utils/validation.utils';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './user.model';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    @HttpCode(201)
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

        if (!users) throw new HttpException('No users found', 404);

        return users;
    }

    async findById(_id: string): Promise<User | null | void> {
        if (!isValidId(_id)) throw new HttpException('Invalid id', 409);

        const user = await this.userModel.findOne({ _id });

        if (!user) throw new HttpException('No user found', 404);

        return user;
    }

    async findByEmail(email: string): Promise<User | void> {
        const user = await this.userModel.findOne({ email });

        if (!user) throw new HttpException('No user found', 404);

        return user;
    }


    // user.service.ts
    async delete(_id: string): Promise<boolean | void> {
        try {
            if (!isValidId(_id)) throw new HttpException('Invalid id', 409);

            const deletedUser = await this.userModel.findByIdAndRemove(_id);

            if (!deletedUser) throw new HttpException('Something went wrong', 400);

            return true;
        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }

    async update(
        _id: string,
        name: string,
        password: string,
    ): Promise<User | void> {
        try {
            if (!isValidId(_id)) throw new HttpException('Invalid id', 409);

            const user = await this.findById(_id);

            if (!user) throw new HttpException('User not found', 404);

            if (name) user.name = name;
            if (password) {
                const hash = await bcrypt.hash(password, 10);
                user.password = hash;
            }

            const updatedUser = this.userModel.findByIdAndUpdate(_id, user);

            if (!updatedUser) throw new HttpException('Something went wrong', 400);

            return updatedUser;
        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }
}
