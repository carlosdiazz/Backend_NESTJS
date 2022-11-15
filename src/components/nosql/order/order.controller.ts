import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderService } from './order.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  addProductsToOrderDto,
} from './order.dto';

import { ParseObjectIdPipe } from '../../../common/parse-object-idMongo.pipe';

@ApiTags('Order MONGO')
@Controller('order2')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Put(':id/products')
  addProduct(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateOrderDto: addProductsToOrderDto,
  ) {
    return this.orderService.addProduct(id, updateOrderDto.productsIds);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':id/product/:productId')
  removeProduct(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('productId', ParseObjectIdPipe) productId: string,
  ) {
    return this.orderService.removeProduct(id, productId);
  }
}
