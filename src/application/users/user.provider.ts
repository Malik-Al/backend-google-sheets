import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../entities/users.entity'

export const UserProviders = [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
]