import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { ManagersProvider } from './managers.provider';

@Module({
  imports: [...ManagersProvider],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService]
})

export class ManagersModule {}