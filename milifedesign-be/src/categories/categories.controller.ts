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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";
import { CategoryIdParam } from "./dto/category-id.param";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "src/utils/guards/jwt-auth.guard";
import { CreateCategoryParams } from "./dto/create-category.params";

@Controller("")
@ApiBearerAuth()
@ApiTags("Categories")
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @Body() body: CreateCategoryDto,
    @Param() params: CreateCategoryParams
  ) {
    return this.categoriesService.create(body, params.stateId);
  }

  @Delete(":categoryId")
  delete(@Param() param: CategoryIdParam) {
    return this.categoriesService.delete(param.categoryId, param.stateId);
  }

  @Get(":categoryId")
  findOne(@Param() param: CategoryIdParam) {
    return this.categoriesService.findOne(param.categoryId);
  }

  @Patch(":categoryId")
  update(@Param() param: CategoryIdParam, @Body() body: UpdateCategoryDto) {
    return this.categoriesService.update(param.categoryId, body, param.stateId);
  }
}
