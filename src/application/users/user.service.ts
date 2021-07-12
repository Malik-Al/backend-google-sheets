import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../entities/users.entity'
import { UpdateUserDto } from './dto/users.dto.update'

@Injectable()
export class UserService {
  constructor (
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async userGet(){
    return await this.userModel.find()
  }


  async userOne(id: string){
    return await this.userModel.findById({_id: Types.ObjectId(id)})
  }


  async userUpdate(dto: UpdateUserDto, id: string){
    return await this.userModel.updateOne({ _id: id }, dto)
  }


  async userRemove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

}