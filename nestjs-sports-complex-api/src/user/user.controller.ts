import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/guards/auth-guards';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @HttpCode(204)
  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @HttpCode(200)
  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    return await this.userService.update(id, user);
  }
}
