import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderItemDto } from './order-item.dto';
import { OrderItemService } from './order-item.service';
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Post()
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItemService.create(data);
  }
}
