import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

@Schema({ timestamps: true })
export class User {

  _id: string

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  @ExcludeProperty()
  password: string;

  createdAt: Date;
}

export type userSchema = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
