import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Costumer, costumerSchema } from './costumer.entity';
import { CreateCostumerDto, UpdateCostumerDto } from './costumer.dto';

@Injectable()
export class CostumersService {
  constructor(
    @InjectModel(Costumer.name) private costumerModel: Model<costumerSchema>,
  ) {}

  async create(data: CreateCostumerDto) {
    try {
      const newCostumer = new this.costumerModel(data);
      return await newCostumer.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Costumer[]> {
    return await this.costumerModel.find().exec();
  }

  async findOne(id: string): Promise<Costumer> {
    const costumer = await this.costumerModel.findById(id);
    if (!costumer) {
      throw new NotFoundException('No se econtro este Costumers');
    }
    return costumer;
  }

  async update(id: string, data: UpdateCostumerDto) {
    await this.findOne(id);
    return await this.costumerModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.costumerModel.findByIdAndDelete(id);
  }
}
