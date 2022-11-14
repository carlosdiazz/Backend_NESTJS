import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Brand } from '../brands/brand.entity';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true, index: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ required: true })
  image: string;

  createdAt: Date;

  //Relacion de uno a uno embebida
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  //Relacion de uno a uno por referencia
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  id_brand: Brand | Types.ObjectId;
}

export type productSchema = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });
