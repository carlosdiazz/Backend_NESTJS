import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { Public } from '../auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard) //Aqui estoy bloquenado todas las rutas, menos las que me envien con Auth
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApiKeyGuard) //Aqui estoy protegiendo una ruta especifica
  @Get('TESTAUTH')
  getAuth1() {
    return this.appService.getTasksMongo();
  }

  @Get('TESTAUTH1')
  @SetMetadata('isPublic', true) // Con esta metada siempre sera publica esta peticion
  getAuth2() {
    return this.appService.getTasksMongo();
  }

  @Public() //Aqui cree este decorador propio para que esta ruta sea publica siempre
  @Get('TESTAUTH2')
  getAuth3() {
    return this.appService.getTasksMongo();
  }

  //@Get('products')
  //getProducts(@Query() params: any) {
  //  const { limit, offset } = params;
  //  return `Productos Limit => ${limit} Offest => ${offset}`;
  //
  //@Get('product/:id')
  //getProduct(@Param() params: any) {
  //  return `Productos ${params.id}`;
  //}
}
