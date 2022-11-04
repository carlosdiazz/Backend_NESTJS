import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Body,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getAllOrders() {
    return this.orderService.findAll();
  }

  @Get(':idOrder')
  getOneOrders(@Param('idOrder', ParseIntPipe) idOrder: number) {
    return this.orderService.findOne(idOrder);
  }

  @Post()
  createOrders(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Put(':idOrder')
  updateOrder(
    @Param('idOrder', ParseIntPipe) idOrder: number,
    @Body() data: UpdateOrderDto,
  ) {
    return this.orderService.update(idOrder, data);
  }

  @Delete(':idOrder')
  deleteOrder(@Param('idOrder', ParseIntPipe) idOrder: number) {
    return this.orderService.remove(idOrder);
  }
}
