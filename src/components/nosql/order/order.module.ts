import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.entity';

import { Costumer, CostumerSchema } from '../costumers/costumer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Costumer.name,
        schema: CostumerSchema,
      }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule2 {}
