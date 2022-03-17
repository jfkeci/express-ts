import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    loginLocal() {
        return this.authService.loginLocal();
    }

    @Post()
    registerLocal() {
        return this.authService.registerLocal();
    }
}