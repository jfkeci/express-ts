import { UpdateUserDto } from "./dto/update-user.dto";
import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException("No user found");

    return user;
  }

  async update(userId: string, data: UpdateUserDto) {
    let user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException("No user found");

    await this.prisma.user.update({ where: { id: user.id }, data });

    user = { ...user, ...data };

    return user;
  }
}
