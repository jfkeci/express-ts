import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
    products: Product[] = []

    insertProduct(
        title: string,
        description: string,
        price: number
    ): Product {
        const newId = new Date().toString();

        const newProduct = new Product(
            newId,
            title,
            description,
            price
        );

        this.products.push(newProduct);

        return newProduct;
    }

    getProducts(): Product[] {
        return this.products;
    }
}