import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderItemDto, UpdateOrderDto } from './order-item.dto';
import { Order } from '../order.entity';
import { OrderItem } from './order-item.entity';
import { Product } from '../../products/product.entity';
@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOneBy({ id: data.orderId });
    const product = await this.productRepo.find({
      where: { id: data.productId },
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.orderItemRepo.save(item);
  }
}
