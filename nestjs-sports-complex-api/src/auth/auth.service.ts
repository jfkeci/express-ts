import { HttpCode, HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { NewUserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.model';
import { ExistingUserDTO } from 'src/user/dto/user.dto';
import { sendEmail } from 'src/utils/mailer';
import { VerifyUserDTO } from './dto/verify-user.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async register(
        user: Readonly<NewUserDTO>,
        role: Readonly<string>
    ): Promise<string | void> {
        try {
            const { name, email, password } = user;

            const existingUser = await this.userService.findByEmail(email);

            if (existingUser) throw new HttpException('Email taken', HttpStatus.CONFLICT);

            const hash = await this.hashPassword(password);

            const newUser = await this.userService.create(name, email, hash, role);

            if (!newUser) throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);

            await sendEmail({
                from: 'sportscomplex@info.com',
                to: email,
                subject: 'SportsComplex account verification',
                html: `<html><h1>Confirm account</h1>
                        <br><hr><br>
                        <h3>Verification code: ${newUser.verificationCode}</h3>
                        <br><br>
                        <h4>Click here: <a href="http://localhost:13374/api/users/verify/${newUser._id}/${newUser.verificationCode}">
                        Confirm Email
                        </a></h4></html>`
            });

            return 'Successfully registered, confirm email';
        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }

    async verifyUser(@Param() data: VerifyUserDTO): Promise<string | void> {
        try {
            const { id, verificationCode } = data;

            const user = await this.userService.findById(id);

            if (!user) throw new HttpException('No user found', 404);

            if (user.verified) throw new HttpException('User already verified', 409);

            if (user.verificationCode === verificationCode) {
                user.verified = true;

                await this.userService.update(id, user);

                return 'User successfully verified';
            }

            throw new HttpException('Could not be updated', 400);
        } catch (error: any) {
            throw new HttpException(error.message, 500)
        }
    }

    async forgotPasswordHandler(data): Promise<string | void> {
        const { email } = data;

        const user = await this.userService.findByEmail(email);

        if (!user) throw new HttpException('User not found', 404);

        if (!user.verified) throw new HttpException('User not verified', 409);

        const resetCode = nanoid();

        user.passwordResetCode = resetCode;

        const updatedUser = await this.userService.update(user._id, user);

        if (!updatedUser) throw new HttpException('Something went wrong', 400);

        await sendEmail({
            from: 'sportscomplex@info.com',
            to: user.email,
            subject: "Reset your password",
            html: `<html>
            <h1>Password reset</h1>
            <br><hr><br>
            <h3>Password reset code: ${resetCode} </h3>
            <br><br>
            <h3>Id: ${user._id} </h3>
            </html>`,
        });

        return 'If user with this email is registered, you will recieve a password reset email';
    }

    async login() { }
    async refresh() { }
    async logout() { }
}
