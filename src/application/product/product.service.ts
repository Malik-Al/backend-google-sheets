import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto'
import { Product, ProductDocument } from '../../entities/product.entity';
const _ = require('lodash');
import { CategoriesService } from '../categories/categories.service'
import { Interval } from '@nestjs/schedule';



@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private readonly categoriesService: CategoriesService
  ) {}


  extractValue(data, prop) {
    return data.map((item) => item[prop]);
  }


  resultIncludes(flatData, xor) {
    return flatData.filter((item) => xor.includes(item['vendorCode']));
  }


  async noActiveData(query) {
    const filterId = this.extractValue(query, 'id');
    const activeChange = await this.productModel.updateMany(
      { _id: filterId },
      { $set: { active: false }},
    );
    return activeChange;
  }


  async updateDatabase(filterClient) {
    const requests = filterClient.map(item => {
      return this.productModel.updateOne({ vendorCode: item.vendorCode }, {
        $set: item
      });
    });
    const response = await Promise.all( requests );
    return response
  }

  @Interval(1000 * 3600)
  async googleSheetsDataSave() {
    await this.categoriesService.saveCategories();
    await this.categoriesService.categoriesDataId();
    console.log('3 googleSheetsDataSave ');
    const dbData = await this.productModel.find();
    const resultDB = this.extractValue( dbData, 'vendorCode' );

    const sheetsData = await this.categoriesService.categoriesDataId();
    const dataSheets = Object.values(sheetsData);
    const resultFlatData = await dataSheets.flat(Infinity);

    const resultRes = this.extractValue( resultFlatData, 'vendorCode' );
    const lodashXor = _.xor( resultRes, resultDB );

    const resultDataClient = this.resultIncludes( dbData, lodashXor );
    await this.noActiveData( resultDataClient );

    const resultDataDB = this.resultIncludes( resultFlatData, lodashXor );
    await this.updateDatabase( resultFlatData );
    return await this.productModel.insertMany( resultDataDB, { ordered: true });  // метод сохранение данных из  таблицы в базу

  }


  async getAllProduct() {
    const db = await this.productModel.find();
    return db;
  }


  async createProduct( dto: CreateProductDto ) {
    return await this.productModel.create(dto);
  }


  async updateProduct(dto: UpdateProductDto, id: string) {
    return await this.productModel.updateOne({ _id: id }, dto);
  }


  async oneAllProduct(id: string) {
    return await this.productModel.findById({_id: Types.ObjectId(id)});
  }


  async removeProduct(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }




 // @Interval(1000)
 //  async deleteActiveFalse(){                        /// delete method active:false
 //    const data = await this.productModel.find();
 //    console.log('test3');
 //    const deleteData = data.filter(function( obj ) {
 //      return obj.active !== true;
 //    });
 //    const delFalse = deleteData.map((item) => item['id']);
 //    return await this.productModel.findByIdAndDelete(delFalse)
 //  }


}
