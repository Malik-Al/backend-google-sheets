import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type CategoryDocument = Category & Document;
@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Category {
  @Prop()
  name: string;

  @Prop({ default: true })
  active: boolean;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
