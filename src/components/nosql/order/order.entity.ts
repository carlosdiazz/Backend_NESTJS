import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Costumer } from '../costumers/costumer.entity';

@Schema({ timestamps:true })
export class Order {
    @Prop({type: Types.ObjectId, ref: Costumer.name, required: true })
    id_costumer: Types.ObjectId
}

export type orderSchema = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);
