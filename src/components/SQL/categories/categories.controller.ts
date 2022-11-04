import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Body,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategorySchemas, UpdateCategorySchemas } from './categories.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryServices: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista de categories' })
  getAllCategories() {
    return this.categoryServices.findAll();
  }

  @Get(':idCategorie')
  getOneCategories(@Param('idCategorie', ParseIntPipe) idCategorie: number) {
    return this.categoryServices.findOne(idCategorie);
  }

  @Put(':idCategorie')
  updateCategories(
    @Param('idCategorie', ParseIntPipe) idCategorie: number,
    @Body() data: UpdateCategorySchemas,
  ) {
    return this.categoryServices.update(idCategorie, data);
  }

  @Post()
  createCategories(@Body() data: CreateCategorySchemas) {
    return this.categoryServices.create(data);
  }

  @Delete(':idCategorie')
  deleteCategories(@Param('idCategorie', ParseIntPipe) idCategorie: number) {
    return this.categoryServices.delete(idCategorie);
  }
}
