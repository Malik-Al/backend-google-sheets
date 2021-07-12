import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagersSchema } from '../entities/managers.entity';
import { AuthManagersController } from './auth-managers/auth-managers.controller';
import { AuthService } from './auth-user/auth.service';
import { AuthController } from './auth-user/auth.controller';
import { UserSchema } from '../entities/users.entity';
import { jwtConstants } from './constants';
import { AuthManagersService } from './auth-managers/auth-managers.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    MongooseModule.forFeature([
      { name: 'Managers', schema: ManagersSchema },
      { name: 'User', schema: UserSchema },
    ])
  ],
  providers: [
    AuthManagersService,
    AuthService,
    LocalStrategy,
    JwtStrategy],
  controllers: [
    AuthManagersController,
    AuthController,
    ],
  exports: [
    AuthManagersService,
    AuthService,
    ]
})

export class AuthModule {}