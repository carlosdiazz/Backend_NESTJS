import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductSchemas, UpdateProductSchemas } from './product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('El product no fue encontrado');
    }
    return product;
  }

  create(payload: CreateProductSchemas) {
    //const newProduct = new Product();
    //newProduct.description = payload.description;
    //newProduct.image = payload.image;
    //newProduct.name = payload.name;
    //newProduct.price = payload.price;
    //newProduct.stock = payload.stock;
    const newProduct = this.productRepo.create(payload);

    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductSchemas) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('El product no fue encontrado');
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('El product no fue encontrado');
    }
    return this.productRepo.delete(id);
  }
}
