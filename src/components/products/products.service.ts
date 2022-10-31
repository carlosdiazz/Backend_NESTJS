import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductSchemas, UpdateProductSchemas } from './product.dto';
//import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('El product no fue encontrado');
    }
    return product;
  }

  //create(payload: CreateProductSchemas) {
  //  this.counter_ID += 1;
  //  const newProduct = {
  //    id: this.counter_ID,
  //    ...payload,
  //  };
  //  this.products.push(newProduct);
  //  return newProduct;
  //}
//
  //update(id: number, payload: UpdateProductSchemas) {
  //  const index = this.products.findIndex((product) => product.id === id);
  //  if (index >= 0) {
  //    this.products[index] = {
  //      ...this.products[index],
  //      ...payload,
  //    };
  //    return this.products[index];
  //  }
  //  throw new NotFoundException('El product no fue encontrado');
  //}
//
  //delete(id: number) {
  //  const index = this.products.findIndex((product) => product.id === id);
  //  if (index >= 0) {
  //    this.products.splice(index, 1);
  //    return this.products;
  //  }
  //  throw new NotFoundException('El product no fue encontrado');
  //}
}
