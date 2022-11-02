import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { User } from './users.entity';
import { CreateUserSchema, UpdateUserSchemas } from './users.dto';

import { CostumersService } from '../costumers/costumers.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private costumersServices: CostumersService,
  ) {}

  findAll() {
    //const apiKey = this.configService.get('API_KEY');
    //console.log(apiKey);
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Este usuario no se encontro');
    }
    return user;
  }

  async create(payload: CreateUserSchema) {
    try {
      const newUser = this.userRepo.create(payload);
      if (payload.customerId) {
        const customer = await this.costumersServices.findOne(
          payload.customerId,
        );
        newUser.customer = customer;
      }
      return await this.userRepo.save(newUser);
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}'`);
    }
  }

  async update(id: number, payload: UpdateUserSchemas) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Este usuario no se encontro');
    }
    this.userRepo.merge(user, payload);
    return this.userRepo.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Este usuario no se encontro');
    }
    return this.userRepo.delete(id);
  }

  //async getOrderByUser(id: number) {
  //  const user = this.findOne(id);
  //  return {
  //    date: new Date(),
  //    user,
  //    products: await this.productsService.findAll(),
  //  };
  //}
}
