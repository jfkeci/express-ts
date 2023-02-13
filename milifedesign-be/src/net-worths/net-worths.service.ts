import {
  HttpException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common/exceptions";
import { CreateNetWorthDto } from "./dto/create-net-worth.dto";
import { UpdateNetWorthDto } from "./dto/update-net-worth.dto";
import { PrismaService } from "src/utils/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserState, UserStateService } from "src/user-state/user-state.service";

@Injectable()
export class NetWorthsService {
  constructor(
    private prisma: PrismaService,
    private readonly userStateService: UserStateService
  ) {}

  async create(data: CreateNetWorthDto, state?: UserState) {
    const user = await this.prisma.user.findFirst({ where: { id: data.user } });

    if (!user) throw new NotFoundException("No user found");

    const netWorth = await this.prisma.netWorth.create({
      data: {
        ...data,
        currentWorth: data?.currentWorth ?? 0,
        startWorth: data?.startWorth ?? 0,
        predictionToGoal: data?.predictionToGoal ?? new Date(),
        user: { connect: { id: user.id } },
      },
    });

    if (!data.currentWorth) {
      throw new BadRequestException("The current worth is required");
    }

    if (state) {
      return await this.userStateService.getUserState(user.id, state);
    }

    return netWorth;
  }

  async findOne(netWorthId: string) {
    const netWorth = await this.prisma.netWorth.findFirst({
      where: { id: netWorthId },
    });

    if (!netWorth) throw new NotFoundException("No net worth found");

    return netWorth;
  }

  findAll() {
    return `This action returns all netWorths`;
  }

  update(id: string, updateNetWorthDto: UpdateNetWorthDto) {
    return `This action updates a #${id} netWorth`;
  }

  async remove(netWorthId: string, state?: UserState) {
    const netWorth = await this.prisma.netWorth.findFirst({
      where: { id: netWorthId },
      include: { user: true },
    });

    await this.prisma.netWorth.delete({ where: { id: netWorthId } });

    if (state) {
      return await this.userStateService.getUserState(netWorth.user.id, state);
    }

    return netWorth;
  }
}
