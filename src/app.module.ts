import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServicesModule } from "./services/services.module";
import { RoutesModule } from './routes/routes.module';
import {AuthModule} from './auth/auth.module';
@Module({
  imports: [AuthModule, ServicesModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
