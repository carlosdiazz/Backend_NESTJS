import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { CreateBrandDto, UpdateBrandDto } from './brands.dto';
import { Brand, brandSchema } from './brand.entity';


@Injectable()
export class BrandsService {

  constructor(
    @InjectModel(Brand.name) private brandModel: Model<brandSchema>
  ) {}

  async create(data: CreateBrandDto) {
    try {
      const newUser = new this.brandModel(data);
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandModel.find().exec();
  }

  async findOne(id: string): Promise<Brand> {
    const user = await this.brandModel.findById(id);
    if (!user) {
      throw new NotFoundException("Este usuario no existe");
    }
    return user;
  }

  async update(id: string, data: UpdateBrandDto) {
    await this.findOne(id);
    return await this.brandModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.brandModel.findByIdAndDelete(id);
  }
}
