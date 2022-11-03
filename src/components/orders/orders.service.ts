import {
  Injectable,
  NotFoundException,
  //BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Order } from './order.entity';
import { Customer } from '../costumers/costumer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: {
        items: {
          product: {},
        },
      },
    });
    if (!order) {
      throw new NotFoundException('Esta orden no existe');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: data.customerId,
      });
      if (!customer) {
        throw new NotFoundException('Esta id de Customer no existe');
      }
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOneBy({ id });
    if (changes.customerId) {
      const custumer = await this.customerRepo.findOneBy({
        id: changes.customerId,
      });
      order.customer = custumer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    const order = this.orderRepo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Esta orden no existe');
    }
    return this.orderRepo.delete(id);
  }
}
