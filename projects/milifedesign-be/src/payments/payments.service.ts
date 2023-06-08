import {
  NotFoundException,
  BadRequestException,
} from "@nestjs/common/exceptions";
import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PrismaService } from "src/utils/prisma/prisma.service";
import { UserState, UserStateService } from "src/user-state/user-state.service";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userStateService: UserStateService
  ) {}

  async create(data: CreatePaymentDto, state?: UserState) {
    const user = await this.prisma.user.findFirst({ where: { id: data.user } });

    if (!user) throw new NotFoundException("No user found");

    const category = await this.prisma.category.findFirst({
      where: { id: data.category },
    });

    if (!category) throw new NotFoundException("No category found");

    const netWorth = await this.prisma.netWorth.findFirst({
      where: { id: data.netWorth },
    });

    if (!netWorth) throw new NotFoundException("No net worth found");

    const payment = await this.prisma.payment.create({
      data: {
        ...data,
        user: { connect: { id: user.id } },
        category: { connect: { id: category.id } },
        netWorth: { connect: { id: netWorth.id } },
      },
    });

    if (!payment) throw new BadRequestException("Failed creating payment");

    const userState = await this.userStateService.getUserState(user.id, state);

    if (!state) return payment;
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
