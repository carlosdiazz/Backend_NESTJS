import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Brand {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    image: string;
}

export type brandSchema = HydratedDocument<Brand>

export const BrandSchema = SchemaFactory.createForClass(Brand);
