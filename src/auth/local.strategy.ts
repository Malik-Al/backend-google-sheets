import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthManagersService } from './auth-managers/auth-managers.service'
import { AuthService } from './auth-user/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private authManagersService: AuthManagersService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async validateManagers(username: string, password: string): Promise<any> {
    const managers = await this.authManagersService.validateManagers(username, password);
    if (!managers) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return managers;
  }

}