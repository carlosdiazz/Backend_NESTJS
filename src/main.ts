import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT_APP, ENVIRONMENT } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Con esto ignoro los paramtros que esten demas.
      forbidNonWhitelisted: ENVIRONMENT === 'PROD' ? false : true, // Aqui aviso al cliente que paramentro esta enviando demas.
    }),
  ); //Aqui hago las validaciones
  await app.listen(PORT_APP, '0.0.0.0', () => {
    console.log(`👍El server esta arriba en el puerto: ${PORT_APP} 👍💪`);
  });
}
bootstrap();
