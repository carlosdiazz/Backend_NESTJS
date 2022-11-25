import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Con esto ignoro los paramtros que esten demas.
      forbidNonWhitelisted: process.env.NODE_ENV === 'PROD' ? false : true, // Aqui aviso al cliente que paramentro esta enviando demas.
      transformOptions: {
        enableImplicitConversion: true, //Aqui transformo para que los query me lleguen en su formato
      },
    }),
  ); //Aqui hago las validaciones
  //Aqui Debajo podemos validar informacion antes que el controlador reciba el dato
  //app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //!Desactive esto por MONGO

  const config = new DocumentBuilder()
    .setTitle('Api Tienda Carlos')
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
