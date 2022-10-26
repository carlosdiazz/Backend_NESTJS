import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

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

  @Post()
  createProduct(@Body() payload: any) {
    return { message: 'Producto creado', payload: payload };
  }

  @Put(':idProduct')
  updateProduct(@Param('idProduct') idProduct: number, @Body() payload: any) {
    console.log('first');
    return { message: 'productactualizado', idProduct, payload };
  }

  @Delete(':idProduct')
  deleteProduct(@Param('idProduct') idProduct: number) {
    return { message: `Producto eliminado ${idProduct}` };
  }
}
