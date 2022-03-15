import { Controller, Post, Body, Get } from "@nestjs/common";
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
}