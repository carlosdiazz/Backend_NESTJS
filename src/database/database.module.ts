import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

//import { Client } from 'pg';
//import { MongoClient } from 'mongodb';

import { config } from '../config/config';

//Entities
import { Product } from '../components/SQL/products/product.entity';
import { User } from '../components/SQL/users/users.entity';
import { Customer } from '../components/SQL/costumers/costumer.entity';
import { Brand } from '../components/SQL/brands/brands.entity';
import { Category } from '../components/SQL/categories/categories.entity';
import { Order } from '../components/SQL/orders/order.entity';
import { OrderItem } from '../components/SQL/orders/order-item/order-item.entity';
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbConnection, dbHost, dbName, dbPassword, dbPort, dbUser } =
          configService.mongo;
        return {
          uri: `${dbConnection}://${dbHost}:${dbPort}/`,
          user: dbUser,
          pass: dbPassword,
          dbName,
        };
      },
    }),
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
    //{
    //  provide: 'PG',
    //  useFactory: (configService: ConfigType<typeof config>) => {
    //    const postGres = configService.postgres;
    //    const client = new Client({
    //      user: postGres.dbUser,
    //      host: postGres.dbHost,
    //      database: postGres.dbName,
    //      password: postGres.dbPassword,
    //      port: postGres.dbPort,
    //    });
    //    client.connect();
    //    return client;
    //  },
    //  inject: [config.KEY],
    //},
    //{
    //  provide: 'MONGO',
    //  inject: [config.KEY],
    //  useFactory: async (configService: ConfigType<typeof config>) => {
    //    const { dbConnection, dbHost, dbName, dbPassword, dbPort, dbUser } =
    //      configService.mongo;
    //    const uri = `${dbConnection}://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/?authMechanism=DEFAULT`;
    //    const client = new MongoClient(uri);
    //    await client.connect();
    //    const database = client.db(dbName);
    //    return database;
    //  },
    //},
    //{
    //  provide: 'API_KEY',
    //  useValue: 'ddd',
    //},
  ],
  exports: [TypeOrmModule, MongooseModule],
})
export class DatabaseModule {}

//const client = new Client({
//  user: VARIABLES.database.user,
//  host: VARIABLES.database.host,
//  database: VARIABLES.database.name,
//  password: VARIABLES.database.password,
//  port: VARIABLES.database.port,
//});
//client.connect();

//const uri = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
//
//const client = new MongoClient(uri);
//const connect = async () => {
//  await client.connect();
//  const database = client.db('TEST');
//  const collec = await database.collection('TEST');
//  const name = await collec.find().toArray();
//  console.log(name);
//};
//connect();
