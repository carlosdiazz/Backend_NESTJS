import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CostumersService } from './costumers.service';
import { CreateCostumerDto, UpdateCostumerDto } from './costumer.dto';
import { ParseObjectIdPipe2 } from '../../../common/parse-object-idMongo.pipe';

@ApiTags('Costumers con MONGO')
@Controller('costumers2')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) {}

  @Post()
  create(@Body() createCostumerDto: CreateCostumerDto) {
    return this.costumersService.create(createCostumerDto);
  }

  @Get()
  findAll() {
    return this.costumersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe2) id: string) {
    return this.costumersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe2) id: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    return this.costumersService.update(id, updateCostumerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe2) id: string) {
    return this.costumersService.remove(id);
  }
}
