import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Module } from '@nestjs/common';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], //Aqui especifico que este servicio es exportable
})
export class ProductsModule {}
