import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService
  ) {}


  @Get('/get')
  findAll() {
    return this.productService.getAllProduct();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productService.oneAllProduct(id);
  }


  @Put('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(updateProductDto, id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }


  // @Get('false/active')
  // getActive(){
  //   return this.productService.deleteActiveFalse()
  // }
}
