import {
  Get,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserIndividualDto } from './dto/user-Individual.dto'
import { LocalAuthGuard } from '../local-auth.guard';
import { JwtAuthGuard } from '../jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('individual/register')
  async signUpIndividual(
    @Body(ValidationPipe) userIndividualDto: UserIndividualDto
  ): Promise<void> {
    return await this.authService.signUpIndividual(userIndividualDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/get')
  getMe(@Request() req) {
    return req.user;
  }

}