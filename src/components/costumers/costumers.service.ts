import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './costumer.entity';
import {
  CreateCostumersSchemas,
  UpdateCostumersSchemas,
} from './costumers.dto';
@Injectable()
export class CostumersService {
  constructor(
    @InjectRepository(Customer) private costumerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.costumerRepo.find();
  }

  async findOne(id: number) {
    const costumer = await this.costumerRepo.findOneBy({ id });
    if (!costumer) {
      throw new NotFoundException('El costumer no fue encontrado');
    }
    return costumer;
  }

  async create(payload: CreateCostumersSchemas) {
    try {
      const newCostumer = this.costumerRepo.create(payload);
      return await this.costumerRepo.save(newCostumer);
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}'`);
    }
  }

  async update(id: number, payload: UpdateCostumersSchemas) {
    const costumer = await this.costumerRepo.findOneBy({ id });
    if (!costumer) {
      throw new NotFoundException('El costumer no fue encontrado');
    }
    this.costumerRepo.merge(costumer, payload);
    return this.costumerRepo.save(costumer);
  }

  async delete(id: number) {
    const costumer = await this.costumerRepo.findOneBy({ id });
    if (!costumer) {
      throw new NotFoundException('El costumer no fue encontrado');
    }
    return this.costumerRepo.delete(id);
  }
}
