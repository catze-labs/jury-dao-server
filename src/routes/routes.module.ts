import { Module } from '@nestjs/common';
import { JuryController } from './jury/jury.controller';
import { UserController } from './user/user.controller';
import { ServicesModule } from 'src/services/services.module';
import { NonceController } from './nonce/nonce.controller';

@Module({
  imports: [ServicesModule],
  controllers: [JuryController, UserController, NonceController],
  providers: [],
})
export class RoutesModule {}
