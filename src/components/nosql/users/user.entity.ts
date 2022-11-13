import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true})
export class User {

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true})
    nickname: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    createdAt: Date;
}

export type userSchema = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
