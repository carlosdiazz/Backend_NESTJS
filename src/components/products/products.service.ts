import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductSchemas, UpdateProductSchemas } from './product.dto';

import { BrandsService } from '../brands/brands.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand']
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('El product no fue encontrado');
    }
    return product;
  }

  async create(payload: CreateProductSchemas) {
    //const newProduct = new Product();
    //newProduct.description = payload.description;
    //newProduct.image = payload.image;
    //newProduct.name = payload.name;
    //newProduct.price = payload.price;
    //newProduct.stock = payload.stock;
    try {
      const newProduct = this.productRepo.create(payload);
      if (payload.brandId) {
        const brand = await this.brandService.findOne(payload.brandId);
        newProduct.brand = brand;
      }
      return await this.productRepo.save(newProduct);
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}'`);
    }
  }

  async update(id: number, payload: UpdateProductSchemas) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('El product no fue encontrado');
    }
    if (payload.brandId) {
      const brand = await this.brandService.findOne(payload.brandId);
      product.brand = brand;
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
