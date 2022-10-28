import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  @Get()
  @ApiOperation({ summary: 'Lista de categories' })
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
