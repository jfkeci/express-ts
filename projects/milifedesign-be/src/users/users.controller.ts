import { UsersService } from "./users.service";
import { UserIdParam } from "./dto/user-id.param";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/utils/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Get, Body, Patch, Param, UseGuards, Controller } from "@nestjs/common";

@Controller()
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":userId")
  findOne(@Param() param: UserIdParam) {
    return this.usersService.findOne(param.userId);
  }

  @Patch(":userId")
  update(@Param() param: UserIdParam, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(param.userId, updateUserDto);
  }
}
