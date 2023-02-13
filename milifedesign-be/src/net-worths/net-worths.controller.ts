import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
} from "@nestjs/common";
import { NetWorthsService } from "./net-worths.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateNetWorthDto } from "./dto/create-net-worth.dto";
import { JwtAuthGuard } from "src/utils/guards/jwt-auth.guard";
import { UpdateNetWorthDto } from "./dto/update-net-worth.dto";
import { NetWorthIdParam } from "./dto/net-worth-id.param";
import { CreateNetWorthParams } from "./dto/create-net-worth.params";

@ApiTags("Net worth")
@Controller("")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NetWorthsController {
  constructor(private readonly netWorthsService: NetWorthsService) {}

  @Get()
  findAll() {
    return this.netWorthsService.findAll();
  }

  @Post()
  create(
    @Body() data: CreateNetWorthDto,
    @Param() params: CreateNetWorthParams
  ) {
    return this.netWorthsService.create(data, params.stateId);
  }

  @Get(":netWorthId")
  findOne(@Param() param: NetWorthIdParam) {
    return this.netWorthsService.findOne(param.netWorthId);
  }

  @Delete(":netWorthId")
  remove(
    @Param() param: NetWorthIdParam,
    @Param() params: CreateNetWorthParams
  ) {
    return this.netWorthsService.remove(param.netWorthId, params.stateId);
  }
}
