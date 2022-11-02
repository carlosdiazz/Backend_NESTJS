import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from './brands.entity';
import { CreateBrandSchema, UpdateBrandSchemas } from './brands.dto';
@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException('No se encontro este Brand');
    }
    return brand;
  }

  async create(data: CreateBrandSchema) {
    try {
      const newBrand = this.brandRepo.create(data);
      return await this.brandRepo.save(newBrand);
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}'`);
    }
  }

  async update(id: number, data: UpdateBrandSchemas) {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException('No se encontro este Brand');
    }
    this.brandRepo.merge(brand, data);
    return this.brandRepo.save(brand);
  }

  async delete(id: number) {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException('No se encontro este Brand');
    }
    return this.brandRepo.delete(id);
  }
}
