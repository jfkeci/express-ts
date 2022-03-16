import { Body, Controller, Delete, Get, HttpCode, Param, Patch } from '@nestjs/common';
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
    @HttpCode(200)
    async getById(@Param('id') id: string) {
        return await this.userService.findById(id);
    }

    @Delete()
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.userService.delete(id);
    }

    @Patch()
    @HttpCode(200)
    async update(
        @Param('id') id: string,
        @Body() user: User
    ) {
        return await this.userService.update(id, user);
    }
}
