import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserSchema, UpdateUserSchemas } from './users.schemas';

@Injectable()
export class UsersService {
  private id_User = 1;
  private users: User[] = [];

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
}
