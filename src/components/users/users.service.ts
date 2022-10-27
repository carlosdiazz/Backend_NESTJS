import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { Order } from '../orders/order.entity';
import { CreateUserSchema, UpdateUserSchemas } from './users.schemas';
import { ProductsService } from '../products/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

  private id_User = 1;
  private users: User[] = [
    {
      id: 1,
      firstName: 'Carlos',
      lastName: 'Diaz',
      nickname: 'carlos000814',
      email: 'c.diaz@mail.com',
      password: '123carlos',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException('Este usuario no se encontro');
    }
    return user;
  }

  create(payload: CreateUserSchema) {
    this.id_User += 1;
    const newUser = {
      id: this.id_User,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserSchemas) {
    const user = this.users.findIndex((item) => item.id === id);
    if (user >= 0) {
      this.users[user] = {
        ...this.users[user],
        ...payload,
      };
      return this.users[user];
    }
    throw new NotFoundException('El usuario no se encontro');
  }

  delete(id: number) {
    const user = this.users.findIndex((item) => item.id === id);
    if (user >= 0) {
      this.users.splice(user, 1);
      return this.users;
    }
    throw new NotFoundException('El usuario no se encontro');
  }

  getOrderByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
