import { Controller, Post, Body, Get, Param, NotFoundException, Patch } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { Product } from "./product.model";
import { ProductService } from "./products.service";

@Controller('Products')
export class ProductsController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    addProduct(
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number,
    ): Product {
        return this.productService.insertProduct(
            productTitle,
            productDescription,
            productPrice
        )
    }

    @Get()
    getProducts(): Product[] {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productService.getProduct(id);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') id: string,
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number
    ) {
        return this.productService.updateProduct(
            id, productTitle, productDescription, productPrice
        );
    }
}