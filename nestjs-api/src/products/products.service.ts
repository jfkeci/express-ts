import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    products: Product[] = []; // Array of products

    insertProduct(title: string, description: string, price: number) {
        const newId = new Date().toString()
        const newProduct = new Product(
            newId,
            title,
            description,
            price
        );
        this.products.push(newProduct)
        return newId;
    }
}