import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
