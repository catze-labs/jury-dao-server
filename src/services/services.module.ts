import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JuryService } from './jury/jury.service';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { NonceService } from './nonce/nonce.service';

@Module({
  providers: [
    PrismaService,
    JuryService,
    UserService,
    JwtService,
    NonceService,
    SignatureService
  ],
  exports: [PrismaService, JuryService, UserService, NonceService, SignatureService],
})
export class ServicesModule {}
