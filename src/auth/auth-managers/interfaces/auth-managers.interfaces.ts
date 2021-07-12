import { Document } from 'mongoose';

export interface Managers extends Document {
  readonly username: string;
  readonly password: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly middleName: string;
}