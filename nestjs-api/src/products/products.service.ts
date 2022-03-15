import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
    private products: Product[] = []

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
        return [...this.products];
    }

    getProduct(id: string) {
        const product = this.products.find((prod) => prod.id = id);

        if (!product) throw new NotFoundException('Could not find product');

        return { ...product };
    }

    getProductIndex(id: string) {
        const index = this.products.findIndex((prod) => prod.id = id);

        if (!index) throw new NotFoundException('Could not find product');

        return index;
    }

    updateProduct(
        id: string,
        title: string,
        description: string,
        price: number
    ) {
        const index = this.getProductIndex(id);

        if (title) this.products[index]['title'] = title;
        if (description) this.products[index]['description'] = description;
        if (price) this.products[index]['price'] = price;

        return { ...this.products[index] };
    }
}