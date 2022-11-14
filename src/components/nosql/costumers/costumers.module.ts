import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CostumersService } from './costumers.service';
import { CostumersController } from './costumers.controller';
import { Costumer, CostumerSchema } from './costumer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Costumer.name,
        schema: CostumerSchema,
      },
    ]),
  ],
  controllers: [CostumersController],
  providers: [CostumersService],
})
export class CostumersModule2 {}
