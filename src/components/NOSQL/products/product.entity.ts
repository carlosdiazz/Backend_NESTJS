import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { number } from 'zod';

@Schema()
export class Product {
  @Prop({ required: true })
  nane: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: number, required: true })
  price: number;

  @Prop({ type: number, required: true })
  stock: number;

  @Prop({ required: true })
  image: string;
}

export type CatDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
