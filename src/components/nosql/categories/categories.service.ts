import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { Category, categorySchema } from './category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private catyegoryModel: Model<categorySchema>,
  ) {}


  async findAll(): Promise<Category[]> {
    return await this.catyegoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.catyegoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Esta categorya no existe');
    }
    return category
  }

  async create(data: CreateCategoryDto) {
    try {
      const newCategory = new this.catyegoryModel(data);
      return await newCategory.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }

  async update(id: string, data: UpdateCategoryDto) {
    await this.findOne(id);
    return await this.catyegoryModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.catyegoryModel.findByIdAndDelete(id);
  }
}
