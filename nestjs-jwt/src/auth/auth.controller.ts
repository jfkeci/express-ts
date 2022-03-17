import { Body, Controller, Post } from "@nestjs/common";
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
}