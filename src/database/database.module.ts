import { Module, Global } from '@nestjs/common';

const API_KEY = 'DEV123456';
const API_KEY_PRO = 'PROD1234';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'PROD' ? API_KEY_PRO : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
