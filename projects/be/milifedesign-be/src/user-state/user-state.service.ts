import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma/prisma.service";

export enum UserState {
  Projects = "projects",
  NetWorth = "net-worth",
}

@Injectable()
export class UserStateService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserState(userId: string, state: UserState) {
    switch (state) {
      case UserState.NetWorth:
        return await this.getUserNetWorthState(userId);
      case UserState.Projects:
        return await this.getUserProjectState(userId);
      default:
        return null;
    }
  }

  async getUserNetWorthState(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        categories: { include: { projects: true } },
        netWorth: { include: { payments: { include: { category: true } } } },
      },
    });

    if (!user) throw new NotFoundException("No user found");

    return user;
  }

  async getUserProjectState(userId: string) {
    //
  }
}
