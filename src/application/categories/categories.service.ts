import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument, Category } from '../../entities/category.entity';
import { Spreadsheets } from '../../googlesheets/spreadsheets'
const _ = require('lodash');


@Injectable()
export class CategoriesService {
  private spreadsheets = new Spreadsheets;

  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {
  }


  extractValue(data, prop) {
    return data.map((item) => item[prop]);
  }


  resultIncludes(flatData, xor) {
    return flatData.filter((item) => xor.includes(item['name']));
  }


  async noActiveData(query) {
    const filterId = this.extractValue(query, 'id');
    const activeChange = await this.categoryModel.updateMany(
      {_id: filterId},
      {$set: {active: false}},
    );
    return activeChange;
  }



  async saveCategories() {
    console.log('1 saveCategories');
      const dataGoogleSheets = await this.spreadsheets.resClient();
      const payload: any = Object.keys(dataGoogleSheets).map(productName => ({
        name: productName
      }));
      const db = await this.categoryModel.find();
      const filterNameSheets = this.extractValue(payload, 'name');
      const filterNameDB = this.extractValue(db, 'name');
      const resultFilterName = _.xor(filterNameSheets, filterNameDB);
      const saveNameSheets = resultFilterName.map(productName => ({
        name: productName
      }));
      const nameCategories = await this.resultIncludes(db, resultFilterName);
      await this.noActiveData(nameCategories);
      const toSave = saveNameSheets.filter(item => {
        return !nameCategories.find(categories => categories.name === item.name);
      });
    return await this.categoryModel.insertMany(toSave, {ordered: true});

  }



  async categoriesDataId() {
    console.log('2 categoriesDataId');
    const db = await this.categoryModel.find();
    const googleSheets = await this.spreadsheets.resClient();
    const result = {};
    Object.entries(googleSheets).forEach(([sheetsName, products]: any) => {
      const nameAdd = db.find(item => item.name === sheetsName);
      const addData = products.map(product => {
        return {
          ...product,
          categoriesId: nameAdd._id,
        }
      });
      result[sheetsName] = addData;
    });

    console.log(result);
    return result;
   }



  async findAllCategories() {
    return await this.categoryModel.find();
  }


  async createCategories(dto: CreateCategoryDto) {
    return await this.categoryModel.create(dto);
  }


  async findOneCategories(id: string) {
    return await this.categoryModel.findById({_id: Types.ObjectId(id)});
  }


  async updateCategories(dto: UpdateCategoryDto, id: string) {
    return await this.categoryModel.updateOne({ _id: id }, dto);
  }


  async removeOneCategories(id: string) {
    return await this.categoryModel.findByIdAndDelete(id);
  }


}
