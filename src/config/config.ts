import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEy,
  };
});

export const validationENV = () => {
  return Joi.object({
    API_KEY: Joi.number().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
  });
};
