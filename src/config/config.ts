import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';
dotenv.config();

export const VARIABLES = {
  postgres: {
    dbName: process.env.DATABASE_NAME,
    dbPort: Number(process.env.DATABASE_PORT),
    dbUser: process.env.DATABASE_USER,
    dbPassword: process.env.DATABASE_PASSWORD,
    dbHost: process.env.DATABASE_HOST,
  },
  apiKey: process.env.API_KEy,
};

export const config = registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB_NAME,
      dbPort: Number(process.env.POSTGRES_DB_PORT),
      dbUser: process.env.POSTGRES_DB_USER,
      dbPassword: process.env.POSTGRES_DB_PASSWORD,
      dbHost: process.env.POSTGRES_DB_HOST,
    },
    apiKey: process.env.API_KEy,
  };
});

export const validationENV = () => {
  return Joi.object({
    API_KEY: Joi.number().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    POSTGRES_DB_NAME: Joi.string().required(),
    POSTGRES_DB_PORT: Joi.number().required(),
    POSTGRES_DB_USER: Joi.string().required(),
    POSTGRES_DB_PASSWORD: Joi.string().required(),
    POSTGRES_DB_HOST: Joi.string().required(),
  });
};
