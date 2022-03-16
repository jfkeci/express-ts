import { Body, Controller, Post } from '@nestjs/common';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('user')
    async createUser(
        @Body() user: NewUserDto,
    ) {
        return await this.authService.register(user, 'user')
    }

    @Post('admin')
    async createAdmin(
        @Body() user: NewUserDto,
    ) {
        return await this.authService.register(user, 'admin')
    }
}
