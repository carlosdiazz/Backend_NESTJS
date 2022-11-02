import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItemController } from './order-item/order-item.controller';
import { OrderItemService } from './order-item/order-item.service';
//Entitites
import { Order } from './order.entity';
import { Customer } from '../costumers/costumer.entity';
import { OrderItem } from './order-item/order-item.entity';
import { Product } from '../products/product.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer, OrderItem, Product])],
  controllers: [OrdersController, OrderItemController],
  providers: [OrdersService, OrderItemService],
})
export class OrdersModule {}
