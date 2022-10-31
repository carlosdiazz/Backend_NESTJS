import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { config } from '../config/config';
import { VARIABLES } from '../config/config';

const client = new Client({
  user: VARIABLES.database.user,
  host: VARIABLES.database.host,
  database: VARIABLES.database.name,
  password: VARIABLES.database.password,
  port: VARIABLES.database.port,
});
client.connect();

@Global()
@Module({
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
  exports: ['PG'],
})
export class DatabaseModule {}
