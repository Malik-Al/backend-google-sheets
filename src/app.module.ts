import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './application/categories/categories.module';
import { ProductModule } from './application/product/product.module';
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './application/users/user.module';
import { ManagersModule } from "./application/managers/managers.module";
import { ScheduleModule } from '@nestjs/schedule';
// const AdminBro = require('admin-bro')
// const AdminBroMongoose = require('@admin-bro/mongoose')
import config from './config'
const mongoUrl = config();


@Module({
  imports: [
    // AdminBro.registerAdapter(AdminBroMongoose),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(mongoUrl.database
        ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    AuthModule,
    CategoriesModule,
    ProductModule,
    UserModule,
    ManagersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
