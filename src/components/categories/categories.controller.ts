import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getAllCategories() {
    return { message: 'Get all Categories' };
  }

  @Put(':idCategorie')
  updateCategories() {
    return { message: 'Update Categories' };
  }

  @Post()
  createCategories() {
    return { message: 'Create Categories' };
  }

  @Delete(':idCategorie')
  deleteCategories() {
    return { message: 'Delete Categories' };
  }
}
