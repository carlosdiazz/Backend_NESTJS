import { CostumersService } from './costumers.service';
import { CostumersController } from './costumers.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CostumersController],
  providers: [CostumersService],
})
export class CostumersModule {}
