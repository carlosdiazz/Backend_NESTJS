import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    image: string
}

export type categorySchema = HydratedDocument<Category>

export const CategorySchema = SchemaFactory.createForClass(Category);