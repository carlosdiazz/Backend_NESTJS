import { Controller, Get, Delete, Put, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getAllBrands() {
    return { message: 'Get all brands' };
  }

  @Delete(':id')
  delete() {
    return { message: 'Delete brands' };
  }

  @Put(':id')
  update() {
    return { message: 'Update brands' };
  }

  @Post()
  create() {
    return { message: 'Create brands' };
  }
}
