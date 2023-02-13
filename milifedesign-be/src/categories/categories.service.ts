import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "src/utils/prisma/prisma.service";
import { UserState, UserStateService } from "src/user-state/user-state.service";

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private readonly userStateService: UserStateService
  ) {}

  async create(data: CreateCategoryDto, state?: UserState) {
    const user = await this.prisma.user.findFirst({
      where: { id: data.userId },
    });

    if (!user) throw new NotFoundException("No user found");

    const category = await this.prisma.category.create({ data });

    let userState;

    if (state) {
      userState = await this.userStateService.getUserState(data.userId, state);
    }

    if (!userState) return category;

    return userState;
  }

  async delete(categoryId: string, state?: UserState) {
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId },
      include: { user: true },
    });

    if (!category) {
      throw new NotFoundException("No category found");
    }

    await this.prisma.category.delete({ where: { id: category.id } });

    let userState;

    if (state) {
      userState = await this.userStateService.getUserState(
        category.user.id,
        state
      );
    }

    if (!userState) return category;

    return userState;
  }

  async findOne(categoryId: string) {
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException("No category found");
    }
  }

  async findAllUserCategories(userId: string) {
    const categories = await this.prisma.category.findMany({
      where: { user: { id: userId } },
    });

    if (!categories?.length) {
      throw new NotFoundException("No categories found");
    }

    return categories;
  }

  async update(categoryId: string, data: UpdateCategoryDto, state?: UserState) {
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId },
      include: { user: true },
    });

    await this.prisma.category.update({
      where: { id: category.id },
      data,
    });

    let userState;

    if (state) {
      userState = await this.userStateService.getUserState(
        category.user.id,
        state
      );
    }

    if (!userState) return category;

    return userState;
  }
}
