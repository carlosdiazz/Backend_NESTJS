import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './costumer.entity';
import { CostumersService } from './costumers.service';
import { CostumersController } from './costumers.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CostumersController],
  providers: [CostumersService],
  exports: [CostumersService] //Aqui especifico que este servicio es exportable
})
export class CostumersModule {}
