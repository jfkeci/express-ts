import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { Auth } from "./entities/auth.entity";

@Controller("Auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  @ApiOkResponse({ type: Auth })
  login(@Body() { email, password, googleId }: LoginDto) {
    return this.authService.login(email, password, googleId);
  }

  @Post("signin")
  @ApiOkResponse({ type: Auth })
  signin(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }
}
