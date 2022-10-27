import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
@Module({
  imports: [ProductsModule], //Aqui importo los modulos adiccionales
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
