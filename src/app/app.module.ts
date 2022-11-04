import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

//Importaciones Propias
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../components/SQL/users/users.module';
import { ProductsModule } from '../components/SQL/products/products.module';
import { BrandsModule } from '../components/SQL/brands/brands.module';
import { OrdersModule } from '../components/SQL/orders/orders.module';
import { CostumersModule } from '../components/SQL/costumers/costumers.module';
import { CategoriesModule } from '../components/SQL/categories/categories.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsModule2 } from '../components/NOSQL/products/products.module';
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
