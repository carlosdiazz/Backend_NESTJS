import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { BrandsModule} from '../brands/brands.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), BrandsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], //Aqui especifico que este servicio es exportable
})
export class ProductsModule {}
