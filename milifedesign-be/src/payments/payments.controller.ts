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
import { PaymentsService } from "./payments.service";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { JwtAuthGuard } from "src/utils/guards/jwt-auth.guard";
import { CreatePaymentParams } from "./dto/create-payment.params";

@Controller("")
@ApiTags("Payments")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Param() params: CreatePaymentParams
  ) {
    return this.paymentsService.create(createPaymentDto, params.stateId);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
