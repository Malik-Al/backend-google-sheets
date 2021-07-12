import { Product, ProductSchema } from '../../entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';

export const productProviders = [
  MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),

];
