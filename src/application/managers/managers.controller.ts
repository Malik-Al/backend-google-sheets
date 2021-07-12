import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersUpdateDto } from './dto/managers.dto.update';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService
  ) {}

  @Get('/get')
  getAll(){
    return this.managersService.managersGet()
  }


  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.managersService.managersOne(id);
  }


  @Post('/:id')
  update(@Param('id') id: string, @Body() managersUpdateDto: ManagersUpdateDto) {
    return this.managersService.managersUpdate(managersUpdateDto, id);
  }


  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.managersService.managersRemove(id);
  }

}