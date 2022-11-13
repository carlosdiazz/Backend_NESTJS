import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category, CategorySchema} from './category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  //exports: []
})
export class CategoriesModule2 {}