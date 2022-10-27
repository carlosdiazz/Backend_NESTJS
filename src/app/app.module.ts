import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../components/users/users.module';
import { ProductsModule } from '../components/products/products.module';
import { BrandsModule } from '../components/brands/brands.module';
import { OrdersModule } from '../components/orders/orders.module';
import { CostumersModule } from '../components/costumers/costumers.module';
import { CategoriesModule } from '../components/categories/categories.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    BrandsModule,
    OrdersModule,
    CostumersModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
