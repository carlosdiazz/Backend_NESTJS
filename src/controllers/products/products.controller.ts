import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getDefault(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return `Esta en la pagina de productos el Offeset es ${offset} y el limit es ${limit}`;
  }

  @Get(':idProduct')
  getProduct(@Param('idProduct') idProduct: string) {
    return `Este es el id => ${idProduct}`;
  }
}
