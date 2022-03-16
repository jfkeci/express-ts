import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product') private readonly product: Model<Product>
  ) { }

  async create(
    title: string,
    description: string,
    price: number
  ) {
    const newProduct = new this.product({
      title: title,
      description: description,
      price: price
    });

    const result = await newProduct.save();

    return result;
  }

  async findAll() {
    const products = await this.product.find({}).exec();

    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price
    }));
  }

  async findOne(_id: string) {
    const product = await this.product.findById(_id);

    return product
  }

  async update(
    _id: string,
    title: string,
    description: string,
    price: number
  ) {
    const product = await this.findOne(_id);

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;

    const updatedProduct = product.save();

    return updatedProduct;
  }

  async remove(_id: string) {
    const deletedProduct = await this.product.findByIdAndDelete(_id);

    return deletedProduct;
  }
}
