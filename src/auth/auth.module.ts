import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ServicesModule } from 'src/services/services.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRE_TIME) },
    }),
    ServicesModule,
  ],
  providers: [JwtStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
