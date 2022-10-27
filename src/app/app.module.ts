import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../components/users/users.module';
import { ProductsModule } from '../components/products/products.module';
import { BrandsModule } from '../components/brands/brands.module';
import { OrdersModule } from '../components/orders/orders.module';
import { CostumersModule } from '../components/costumers/costumers.module';
import { CategoriesModule } from '../components/categories/categories.module';
import { ENVIRONMENT } from '../config/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
const API_KEY = '123456';
const API_KEY_PRO = 'PROD1234';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    BrandsModule,
    OrdersModule,
    CostumersModule,
    CategoriesModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      //useValue: API_KEY,
      useValue: ENVIRONMENT === 'PROD' ? API_KEY_PRO : API_KEY,
    },
    {
      provide: 'TASKS',
      inject: [HttpService],
      useFactory: async (http: HttpService) => {
        const taks = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const value = (await Promise.resolve(firstValueFrom(taks))).data;
        return value;
      },
    },
  ],
})
export class AppModule {}
