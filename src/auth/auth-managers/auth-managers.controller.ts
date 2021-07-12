import {
  Get,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthManagersService } from './auth-managers.service';
import { AuthManagersDto } from './dto/auth-managers.dto';
import { LocalAuthGuard } from '../local-auth.guard';
import { JwtAuthGuard } from '../jwt-auth.guard';


@Controller('managers')
export class AuthManagersController {
  constructor(private authManagersService: AuthManagersService) {}

  @Post('/register')
  async signUp(
    @Body(ValidationPipe) authManagersDto: AuthManagersDto
  ): Promise<void> {
    return await this.authManagersService.signUp(authManagersDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async signIn(@Request() req) {
    return this.authManagersService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  getMe(@Request() req) {
    return req.user;
  }


}