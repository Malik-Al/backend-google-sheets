import { MongooseModule } from '@nestjs/mongoose';
import { Managers, ManagersSchema } from '../../entities/managers.entity';

export const ManagersProvider = [
  MongooseModule.forFeature([{ name: Managers.name, schema: ManagersSchema}])
];

