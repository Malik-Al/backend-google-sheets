import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthManagersDto } from './dto/auth-managers.dto';
import { Managers } from './interfaces/auth-managers.interfaces';

@Injectable()
export class AuthManagersService {
  constructor(@InjectModel('Managers') private managersModel: Model<Managers>,
  private jwtService: JwtService ) {}

  async signUp(authCredentialsDto: AuthManagersDto): Promise<void> {
    const {
      username,
      password,
      lastName,
      firstName,
      middleName,
    } = authCredentialsDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const managers = new this.managersModel({
      username,
      lastName,
      firstName,
      middleName,
      password: hashedPassword });

    try {
      await managers.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async signIn(managers: Managers) {
    const payload = {username: managers.username, sub: managers._id};
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateManagers(username: string, pass: string): Promise<Managers> {
    const managers = await this.managersModel.findOne({ username });
    if (!managers) {
      return null;
    }

  const valid = await bcrypt.compare(pass, managers.password);
    if (valid) {
      return managers;
    }

    return null;
  }

}