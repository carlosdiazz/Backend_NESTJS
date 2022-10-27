import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { Module } from '@nestjs/common';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
