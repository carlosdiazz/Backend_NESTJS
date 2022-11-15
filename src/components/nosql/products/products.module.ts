import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductSchema, Product } from './product.entity';

import { Brand, BrandSchema } from '../brands/brand.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
    Brand,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule2 {}
