import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //@Get('products')
  //getProducts(@Query() params: any) {
  //  const { limit, offset } = params;
  //  return `Productos Limit => ${limit} Offest => ${offset}`;
  //}

  //@Get('product/:id')
  //getProduct(@Param() params: any) {
  //  return `Productos ${params.id}`;
  //}
}
