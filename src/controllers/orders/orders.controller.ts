import { Controller, Get, Put, Post, Delete } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAllOrders() {
    return { message: 'Get all Order' };
  }

  @Post()
  createOrders() {
    return { message: 'Create Order' };
  }

  @Put(':idOrder')
  updateOrder() {
    return { message: 'Update Order' };
  }

  @Delete(':idOrder')
  deleteOrder() {
    return { message: 'Delete Order' };
  }
}
