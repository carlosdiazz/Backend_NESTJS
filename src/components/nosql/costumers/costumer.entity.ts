import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Costumer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;
}

export type costumerSchema = HydratedDocument<Costumer>;

export const CostumerSchema = SchemaFactory.createForClass(Costumer);
