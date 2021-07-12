import { Category, CategorySchema } from '../../entities/category.entity';
import { MongooseModule } from '@nestjs/mongoose';

export const categoryProviders = [
  MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),

];
