import { Injectable,  NotFoundException } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
//import { nanoid } from 'nanoid';

@Injectable()
export class ProductsService {
  private counter_ID = 1
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
    const product = this.products.find((item) => item.id === id)
    if(!product){
      throw new NotFoundException('El product no fue encontrado');
    }
    return product;
  }

  create(payload: any) {
    this.counter_ID+=1
    const newProduct = {
      id: `${this.counter_ID}`,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, payload: any) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index >= 0) {
      this.products[index] = {
        ...this.products[index],
        ...payload,
      };
      return this.products[index];
    }
    throw new NotFoundException('El product no fue encontrado');
  }

  delete(id:string) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index >= 0) {
      this.products.splice(index,1)
      return this.products
    }
    throw new NotFoundException('El product no fue encontrado');
  }
}
