import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
//import { Order } from '../orders/order.entity';
import { CreateUserSchema, UpdateUserSchemas } from './users.dto';
import { ProductsService } from '../products/products.service';
//import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll() {
    //const apiKey = this.configService.get('API_KEY');
    //console.log(apiKey);
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Este usuario no se encontro');
    }
    return user;
  }

  create(payload: CreateUserSchema) {
    const newUser = this.userRepo.create(payload);
    return this.userRepo.save(newUser);
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
