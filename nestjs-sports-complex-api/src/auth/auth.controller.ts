import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewUserDTO } from 'src/user/dto/user.dto';
import { sendEmail } from 'src/utils/mailer';
import { AuthService } from './auth.service';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import {
  ResetPasswordBodyDTO,
  ResetPasswordParamsDTO,
} from './dto/reset-password.dto';
import { VerifyUserDTO } from './dto/verify-user.dto';
import { AdminAuthGuard, UserAuthGuard } from './guards/auth-guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async createUser(@Body() user: NewUserDTO) {
    return await this.authService.register(user, 'user');
  }

  @Post('admin')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async createAdmin(@Body() user: NewUserDTO) {
    return await this.authService.register(user, 'admin');
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

  @Post('/password/reset/:id/:passwordResetCode')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async resetPassword(
    @Param() param: ResetPasswordParamsDTO,
    @Body() body: ResetPasswordBodyDTO,
  ) {
    return await this.authService.resetPassword(param, body);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: LoginUserDTO) {
    return await this.authService.login(dto);
  }

  @UseGuards(AdminAuthGuard) // user auth
  @Get('test')
  async test() {
    return [
      {
        id: 1,
        name: 'iivanovic',
      },
      {
        id: 2,
        name: 'mmarkovic',
      },
      {
        id: 3,
        name: 'jjovanovic',
      },
    ];
  }
}
