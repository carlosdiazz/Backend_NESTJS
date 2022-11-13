import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

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

//import { enviroments } from '../config/enviroments';
import { config, validationENV } from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: enviroments[process.env.NODE_ENV] || '.env',
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
    HttpModule,
    DatabaseModule,
    ProductsModule2,
    CategoriesModule2,
    UsersModule2,
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
