import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './categories.entity';
import { CreateCategorySchemas, UpdateCategorySchemas } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: {
        products: {},
      },
    });
    if (!category) {
      throw new NotFoundException('No se encontro esta Category');
    }
    return category;
  }

  async create(data: CreateCategorySchemas) {
    try {
      const newCategory = this.categoryRepo.create(data);
      return await this.categoryRepo.save(newCategory);
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}'`);
    }
  }

  async update(id: number, data: UpdateCategorySchemas) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('No se encontro esta Category');
    }
    this.categoryRepo.merge(category, data);
    return this.categoryRepo.save(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('No se encontro esta Category');
    }
    return this.categoryRepo.delete(id);
  }

  //async findsById(data: Array<number>) {
  //  const categories = await this.categoryRepo.findOne({
  //    where: { id },
  //    relations: ['products'],
  //  })
  //}
}
