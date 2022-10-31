import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProductsModule } from '../products/products.module';
import { User } from './users.entity';
@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User])], //Aqui importo los modulos adiccionales
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
