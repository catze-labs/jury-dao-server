// import { Module } from '@nestjs/common';
// import { UserService } from '../../services/user/user.service';
// import { UserController } from './user.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { ServicesModule } from 'src/services/services.module';
// import { JwtStrategy } from '../../auth/jwt.strategy';
// import { PassportModule } from '@nestjs/passport';
//
// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: '1 day' },
//     }),
//     ServicesModule,
//   ],
//   providers: [UserService, JwtStrategy],
//   controllers: [UserController],
//   exports: [UserService],
// })
// export class UserModule {}
