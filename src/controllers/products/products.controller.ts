import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {ProductsService} from '../../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProduct(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    //return {
    //  message: `Get all products el Offeset es ${offset} y el limit es ${limit}`,
    //};
    return this.productsService.findAll();
  }

  @Get(':idProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneProduct(@Param('idProduct') idProduct: string) {
    //return { message: `Get one Este es el id => ${idProduct}` };
    return this.productsService.findOne(idProduct);
  }

  @Post()
  createProduct(@Body() payload: any) {
    //return { message: 'Producto creado', payload: payload };
    return this.productsService.create(payload);
  }

  @Put(':idProduct')
  updateProduct(@Param('idProduct') idProduct: string, @Body() payload: any) {

    //return { message: 'productactualizado', idProduct, payload };
    return this.productsService.update(idProduct, payload);
  }

  @Delete(':idProduct')
  deleteProduct(@Param('idProduct') idProduct: string) {
    //return { message: `Producto eliminado ${idProduct}` };
    return this.productsService.delete(idProduct);
  }
}
