import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CostumersService } from './costumers.service';
import {
  CreateCostumersSchemas,
  UpdateCostumersSchemas,
} from './costumers.dto';

@ApiTags('costumers')
@Controller('costumers')
export class CostumersController {
  constructor(private costumersService: CostumersService) {}

  @Get()
  getAllCostumbers() {
    return this.costumersService.findAll();
  }

  @Get(':idCostumer')
  getOneCostumer(@Param('idCostumer', ParseIntPipe) idCostumer: number) {
    return this.costumersService.findOne(idCostumer);
  }

  @Post()
  createProduct(@Body() payload: CreateCostumersSchemas) {
    return this.costumersService.create(payload);
  }

  @Put(':idCostumers')
  upateCostumers(
    @Param('idCostumers', ParseIntPipe) idCostumers: number,
    @Body() payload: UpdateCostumersSchemas,
  ) {
    return this.costumersService.update(idCostumers, payload);
  }

  @Delete(':idCostumers')
  deleteCostumers(@Param('idCostumers', ParseIntPipe) idCostumers: number) {
    return this.costumersService.delete(idCostumers);
  }
}
