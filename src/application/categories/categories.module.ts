import { Module} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoryProviders } from './category.provider';
// import { ProductModule } from '../product/product.module'


@Module({
  imports: [
    ...categoryProviders,
    // ProductModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
