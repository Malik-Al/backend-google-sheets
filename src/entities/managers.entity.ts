import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/entities/users.entity';
import * as mongoose from 'mongoose';

export type ManagersDocument = Managers & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Managers {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  lastName: string;

  @Prop()
  firstName: string;

  @Prop()
  middleName: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User[];

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}
export const ManagersSchema = SchemaFactory.createForClass(Managers);
