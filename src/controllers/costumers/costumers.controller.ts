import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('costumers')
export class CostumersController {
  @Get()
  getAllCostumbers() {
    return { message: 'Get All Costumers' };
  }

  @Post()
  createProduct() {
    return { message: 'Create Costumers' };
  }

  @Put(':idCostumers')
  upateCostumers() {
    return { message: 'Update Costumers' };
  }

  @Delete(':idCostumers')
  deleteCostumers() {
    return { message: 'Delete Costumers' };
  }
}
