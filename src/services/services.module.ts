import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {JuryService} from './jury/jury.service';
import {UserService} from './user/user.service';
@Module({
  providers: [PrismaService, JuryService, UserService],
  exports: [PrismaService, JuryService, UserService],
})
export class ServicesModule {}
