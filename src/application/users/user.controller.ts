import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/users.dto.update'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService
  ) {}

  @Get('/get')
  getAll(){
    return this.userService.userGet()
  }


  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.userOne(id);
  }


  @Post('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.userUpdate(updateUserDto, id);
  }


  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.userRemove(id);
  }

}