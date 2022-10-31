import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { config } from '../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

//const client = new Client({
//  user: VARIABLES.database.user,
//  host: VARIABLES.database.host,
//  database: VARIABLES.database.name,
//  password: VARIABLES.database.password,
//  port: VARIABLES.database.port,
//});
//client.connect();
console.log(__dirname + '../components/**/*.entity.ts');
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
          entities: [__dirname + '../components/products/*.entity.js'],
          synchronize: true,
        } as DataSourceOptions),
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
