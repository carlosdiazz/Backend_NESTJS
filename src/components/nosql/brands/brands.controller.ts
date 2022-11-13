import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './brands.dto';

import {
  ParseObjectIdPipe2,
} from '../../../common/parse-object-idMongo.pipe';


@ApiTags('Brands Mongo')
@Controller('brands2')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe2) id: string) {
    return this.brandsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe2) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe2) id: string) {
    return this.brandsService.remove(id);
  }
}
