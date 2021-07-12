import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.provider';
import { Spreadsheets } from '../../googlesheets/spreadsheets';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    ...productProviders,
    CategoriesModule
  ],
  controllers: [ProductController],
  providers: [ProductService, Spreadsheets],
  exports: [ProductService,
  ],
})
export class ProductModule {}
