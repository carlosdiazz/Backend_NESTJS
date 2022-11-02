import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';

import { Customer } from '../costumers/costumer.entity';
import { OrderItem } from './order-item/order-item.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order, { nullable: true })
  items: OrderItem[];

  //date: Date;
  //user: User;
  //products: Product[];
}
