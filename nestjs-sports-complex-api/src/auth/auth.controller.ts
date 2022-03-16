import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewUserDTO } from 'src/user/dto/user.dto';
import { sendEmail } from 'src/utils/mailer';
import { AuthService } from './auth.service';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { VerifyUserDTO } from './dto/verify-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('user')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async createUser(@Body() user: NewUserDTO) {
        return await this.authService.register(user, 'user')
    }

    @Post('admin')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async createAdmin(@Body() user: NewUserDTO) {
        return await this.authService.register(user, 'admin')
    }

    @Get('verify/:id/:verificationCode')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async verifyUser(@Param() data: VerifyUserDTO) {
        return await this.authService.verifyUser(data);
    }

    @Get('password/forgot')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async forgotPassword(@Body() data: ForgotPasswordDTO) {
        return await this.authService.forgotPasswordHandler(data);
    }



    @Get('test')
    async test() {
        return 'email';
    }
}
