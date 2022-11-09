import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ required: true })
  image: string;

  createdAt: Date;
}

export type productSchema = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
