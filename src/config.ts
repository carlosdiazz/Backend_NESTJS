import * as dotenv from 'dotenv';
dotenv.config();

export const PORT_APP = process.env.PORT_APP || 3000;
export const ENVIRONMENT = process.env.ENVIRONMENT || 'DEV';
