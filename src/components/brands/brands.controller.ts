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
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from './brands.service';
import { CreateBrandSchema, UpdateBrandSchemas } from './brands.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  getAllBrands() {
    return this.brandService.findAll();
  }

  @Get(':idBrand')
  getOneBrand(@Param('idBrand', ParseIntPipe) idBrand: number) {
    return this.brandService.findOne(idBrand);
  }

  @Delete(':idBrand')
  delete(@Param('idBrand', ParseIntPipe) idBrand: number) {
    return this.brandService.delete(idBrand);
  }

  @Put(':idBrand')
  update(
    @Param('idBrand', ParseIntPipe) idBrand: number,
    @Body() data: UpdateBrandSchemas,
  ) {
    return this.brandService.update(idBrand, data);
  }

  @Post()
  create(@Body() data: CreateBrandSchema) {
    return this.brandService.create(data);
  }
}
