import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import {Product} from './product.entity';


export type UserDocument = User & Document;
@Schema({ timestamps: { createdAt: 'createdAt' } })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  lastName: string;

  @Prop()
  firstName: string;

  @Prop()
  middleName: string;

  @Prop()
  campaignNames: string;

  @Prop()
  mainOccupation: string;

  @Prop()
  position: string;

  @Prop()
  address: string;

  @Prop()
  inn: string;

  @Prop()
  phone: string;

  @Prop()
  bankAccount: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  product: Product[];

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
