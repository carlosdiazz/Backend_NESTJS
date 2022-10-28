import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Con esto ignoro los paramtros que esten demas.
      forbidNonWhitelisted: process.env.NODE_ENV === 'PROD' ? false : true, // Aqui aviso al cliente que paramentro esta enviando demas.
    }),
  ); //Aqui hago las validaciones

  const config = new DocumentBuilder()
    .setTitle('Api example')
    .setDescription('Esta es una api de Ejemplo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(
      `👍El server esta arriba en el puerto: ${process.env.PORT || 3000} 👍💪`,
    );
  });
}
bootstrap();
