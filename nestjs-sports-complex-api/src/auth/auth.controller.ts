import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewUserDTO } from 'src/user/dto/user.dto';
import { sendEmail } from 'src/utils/mailer';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('user')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() user: NewUserDTO) {
        return await this.authService.register(user, 'user')
    }

    @Post('admin')
    @UsePipes(new ValidationPipe())
    async createAdmin(@Body() user: NewUserDTO) {
        return await this.authService.register(user, 'admin')
    }

    @Get('test')
    async test() {
        return 'email';
    }
}
