import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserInterface } from 'src/user/user.interface';
import { UserDocument } from 'src/user/user.model';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12)
    }

    async register(
        user: Readonly<NewUserDto>,
        role: Readonly<string>
    ): Promise<UserDocument | void> {
        const { name, email, password } = user;

        const existingUser = await this.userService.findByEmail(email);

        if (existingUser) throw new HttpException('Email taken', HttpStatus.CONFLICT);

        const hash = await this.hashPassword(password);

        const newUser = this.userService.create(name, email, hash, role);

        return newUser;
    }
}
