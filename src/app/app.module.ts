import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../components/users/users.module';
import { ProductsModule } from '../components/products/products.module';
import { BrandsModule } from '../components/brands/brands.module';
import { OrdersModule } from '../components/orders/orders.module';
import { CostumersModule } from '../components/costumers/costumers.module';
import { CategoriesModule } from '../components/categories/categories.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from '../config/enviroments';
import config from '../config/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    BrandsModule,
    OrdersModule,
    CostumersModule,
    CategoriesModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      inject: [HttpService],
      useFactory: async (http: HttpService) => {
        const taks = http.get('https://jsonplaceholder.typicode.com/todos');
        const value = (await Promise.resolve(firstValueFrom(taks))).data;
        return value;
      },
    },
  ],
})
export class AppModule {}
