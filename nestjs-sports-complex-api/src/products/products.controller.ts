import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    return await this.productsService.create(title, description, price);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    return await this.productsService.update(
      id, title, description, price
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
