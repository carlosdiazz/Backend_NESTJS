import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { HttpModule, HttpService } from '@nestjs/axios';

//Importaciones Propias
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Modolo usando SQL
import { UsersModule } from '../components/sql/users/users.module';
import { ProductsModule } from '../components/sql/products/products.module';
import { BrandsModule } from '../components/sql/brands/brands.module';
import { OrdersModule } from '../components/sql/orders/orders.module';
import { CostumersModule } from '../components/sql/costumers/costumers.module';
import { CategoriesModule } from '../components/sql/categories/categories.module';
import { DatabaseModule } from 'src/database/database.module';

//Modulos usando NOSQL con Mongo
import { ProductsModule2 } from '../components/nosql/products/products.module';
import { CategoriesModule2 } from '../components/nosql/categories/categories.module';
import { UsersModule2 } from '../components/nosql/users/users.module';
import { BrandsModule2 } from '../components/nosql/brands/brands.module';
import { CostumersModule2 } from '../components/nosql/costumers/costumers.module';
import { OrderModule2 } from '../components/nosql/order/order.module';
import { enviroments } from '../config/enviroments';
import { config, validationENV } from '../config/config';

//Modulos adicionales
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      //envFilePath: '.prod.env',
      load: [config],
      isGlobal: true,
      validationSchema: validationENV(),
    }),
    UsersModule,
    ProductsModule,
    BrandsModule,
    OrdersModule,
    CostumersModule,
    CategoriesModule,
    //HttpModule,
    DatabaseModule,
    ProductsModule2,
    CategoriesModule2,
    UsersModule2,
    BrandsModule2,
    CostumersModule2,
    OrderModule2,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //{
    //  provide: 'TASKS',
    //  inject: [HttpService],
    //  useFactory: async (http: HttpService) => {
    //    const taks = http.get('https://jsonplaceholder.typicode.com/todos');
    //    const value = (await Promise.resolve(firstValueFrom(taks))).data;
    //    return value;
    //  },
    //},
  ],
})
export class AppModule {}
