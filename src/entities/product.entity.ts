import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from './category.entity'


export type ProductDocument = Product & Document;
@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Product {

  @Prop()
  vendorCode: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  description: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  sale: number;

  @Prop()
  afterSale: number;

  @Prop({ default: true })
  active: boolean;

  @Prop()
  categoriesId: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);

