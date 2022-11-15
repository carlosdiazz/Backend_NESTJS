import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Order, orderSchema } from './order.entity';

import { Costumer, costumerSchema } from '../costumers/costumer.entity';
import { Product, productSchema } from '../products/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<orderSchema>,
    @InjectModel(Costumer.name) private costumerModel: Model<costumerSchema>,
    @InjectModel(Product.name) private productModel: Model<productSchema>,
  ) {}

  async create(data: CreateOrderDto) {
    try {
      const { id_costumer, products } = data;
      const verificarCustomer = await this.costumerModel.findById(id_costumer);
      if (!verificarCustomer) {
        throw new NotFoundException('Este ID no tiene un Costumer');
      }
      for (const id of products) {
        if (!(await this.productModel.findById(id))) {
          throw new NotFoundException(
            'Hay un ID que no esta vinculado a un producto',
          );
        }
      }
      const newOrder = new this.orderModel(data);
      return await newOrder.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel
      .find()
      .populate(['id_costumer', 'products'])
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('No se encontro esta Orden');
    }
    return order;
  }

  async update(id: string, data: UpdateOrderDto) {
    await this.findOne(id);
    return await this.orderModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Esta orden no se encuentra');
    }
    order.products.pull(productId); //Con este metodo elimino del array este ID
    return await order.save();
  }

  async addProduct(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Esta orden no se encuentra');
    }

    for (const id of productsIds) {
      if (!(await this.productModel.findById(id))) {
        throw new NotFoundException(
          'Hay un ID que no esta vinculado a un producto',
        );
      }
    }

    productsIds.forEach((element) => {
      order.products.addToSet(element);
    });
    return order.save();
  }
}
