import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';

import { ProductsModule } from '../products/products.module';
import { CostumersModule } from '../costumers/costumers.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User]), CostumersModule], //Aqui importo los modulos adiccionales
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
