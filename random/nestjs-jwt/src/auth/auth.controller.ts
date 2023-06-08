import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    loginLocal(@Body() dto: AuthDTO) {
        return this.authService.loginLocal(dto);
    }

    @Post('register')
    registerLocal(@Body() dto: AuthDTO) {
        return this.authService.registerLocal(dto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    test() {
        return [
            {
                id: 1,
                name: 'iivanovic'
            },
            {
                id: 2,
                name: 'mmarkovic'
            },
            {
                id: 3,
                name: 'jjovanovic'
            }
        ];
    }
}