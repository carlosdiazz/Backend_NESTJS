import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Brand } from '../brands/brands.entity';
import { Category } from '../categories/categories.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

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

  //QUien tengan el metodo ManyToOne... La relacion si oh si debe de ir aqui
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  //Aqui estoy haciendo una relacion de mucho a mucho Bidericional
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable() //Solo debe de ir en un lado de la relacion JoinTable
  categories: Category[];
}
