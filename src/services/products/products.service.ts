import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '5435',
      name: 'Product 1',
      description: 'Descripcion Product 1',
      price: 100,
      stock: 45,
      image: 'http://image.com.Product1',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    const newProduct = {
      id: nanoid(4),
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
}
