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
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ParseIntPipe2 } from '../../common/parse-int.pipe';
import { CreateProductSchemas, UpdateProductSchemas } from './product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
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
  getOneProduct(@Param('idProduct', ParseIntPipe) idProduct: number) {
    //return { message: `Get one Este es el id => ${idProduct}` };
    return this.productsService.findOne(idProduct);
  }

  //@Post()
  //createProduct(@Body() payload: CreateProductSchemas) {
  //  //return { message: 'Producto creado', payload: payload };
  //  return this.productsService.create(payload);
  //}
//
  //@Put(':idProduct')
  //updateProduct(
  //  @Param('idProduct', ParseIntPipe2) idProduct: number,
  //  @Body() payload: UpdateProductSchemas,
  //) {
  //  //return { message: 'productactualizado', idProduct, payload };
  //  return this.productsService.update(idProduct, payload);
  //}
//
  //@Delete(':idProduct')
  //deleteProduct(@Param('idProduct', ParseIntPipe2) idProduct: number) {
  //  //return { message: `Producto eliminado ${idProduct}` };
  //  return this.productsService.delete(idProduct);
  //}
}
