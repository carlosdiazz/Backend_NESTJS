import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';

import { config } from '../config/config';

//Entities
import { Product } from '../components/products/product.entity';
import { User } from '../components/users/users.entity';
import { Customer } from '../components/costumers/costumer.entity';
import { Brand } from '../components/brands/brands.entity';
import { Category } from '../components/categories/categories.entity';
import { Order } from '../components/orders/order.entity';
import { OrderItem } from '../components/orders/order-item/order-item.entity';
//const client = new Client({
//  user: VARIABLES.database.user,
//  host: VARIABLES.database.host,
//  database: VARIABLES.database.name,
//  password: VARIABLES.database.password,
//  port: VARIABLES.database.port,
//});
//client.connect();
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) =>
        ({
          type: 'postgres',
          host: configService.postgres.dbHost,
          port: configService.postgres.dbPort,
          username: configService.postgres.dbUser,
          password: configService.postgres.dbPassword,
          database: configService.postgres.dbName,
          entities: [
            Product,
            User,
            Customer,
            Brand,
            Category,
            Order,
            OrderItem,
          ],
          synchronize: true,
        } as DataSourceOptions),
      //({
      //  type: 'mysql',
      //  host: configService.mysql.dbHost,
      //  port: configService.mysql.dbPort,
      //  username: configService.mysql.dbUser,
      //  password: configService.mysql.dbPassword,
      //  database: configService.mysql.dbName,
      //  entities: [Product, User],
      //  synchronize: true,
      //} as DataSourceOptions),
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const postGres = configService.postgres;
        const client = new Client({
          user: postGres.dbUser,
          host: postGres.dbHost,
          database: postGres.dbName,
          password: postGres.dbPassword,
          port: postGres.dbPort,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
    //{
    //  provide: 'API_KEY',
    //  useValue: 'ddd',
    //},
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
