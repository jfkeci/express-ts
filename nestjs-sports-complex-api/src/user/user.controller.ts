import { Body, Controller, Get, HttpCode, Param } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(200)
    async getAll() {
        return await this.userService.getAll();
    }

    @Get()
    async getById(@Param('id') id: string) {
        return await this.userService.findById(id);
    }

    async delete(@Param('id') id: string) {
        return await this.userService.delete(id);
    }

    async update(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('password') password: string
    ) {
        return await this.userService.update(id, name, password);
    }
}
