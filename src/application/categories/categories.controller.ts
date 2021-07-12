import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategories(@Body() createDto: CreateCategoryDto) {
    return await this.categoriesService.createCategories(createDto);
  }


  @Get('/get')
  async findAll() {
    return await this.categoriesService.findAllCategories();
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOneCategories(id);
  }


  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() categoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategories(categoryDto, id);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.removeOneCategories(id);
  }


}
