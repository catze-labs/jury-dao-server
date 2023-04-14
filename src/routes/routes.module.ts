import { Module } from '@nestjs/common';
import {JuryController} from './jury/jury.controller';
import {UserController} from './user/user.controller';
import {ServicesModule} from 'src/services/services.module';
@Module({
 imports : [ServicesModule],
 controllers : [JuryController, UserController],
 providers : []
})
export class RoutesModule {}
