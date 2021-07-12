import { Module } from '@nestjs/common';
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserProviders } from './user.provider'

@Module({
  imports: [...UserProviders],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule {}