import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly middleName: string;
  readonly campaignNames: string;
  readonly inn: string;
  readonly mainOccupation: string;
  readonly position: string;
  readonly address: string;
  readonly phone: string;
  readonly bankAccount: string;
}
