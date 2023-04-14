import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {JuryService} from './jury/jury.service';
import {UserService} from './user/user.service';
import {JwtService} from '@nestjs/jwt';

@Module({
  providers: [PrismaService, JuryService, UserService, JwtService],
  exports: [PrismaService, JuryService, UserService],
})
export class ServicesModule {}
