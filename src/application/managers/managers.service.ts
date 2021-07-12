import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Managers, ManagersDocument } from '../../entities/managers.entity'
import { ManagersUpdateDto } from './dto/managers.dto.update';

@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Managers.name)
    private managersModel: Model<ManagersDocument>
  ){}

  async managersGet(){
    return await this.managersModel.find()
  }


  async managersOne(id: string){
    return await this.managersModel.findById({_id: Types.ObjectId(id)})
  }


  async managersUpdate(dto: ManagersUpdateDto, id: string){
    return await this.managersModel.updateOne({ _id: id }, dto)
  }


  async managersRemove(id: string){
    return await this.managersModel.findByIdAndDelete(id)
  }
}