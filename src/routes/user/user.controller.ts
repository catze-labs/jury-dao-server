import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { RegisterUserDto } from '../dtos/registerUser.dto';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const { walletAddress, name, email, twitterHandle } = registerUserDto;
    return await this.userService.register(
      walletAddress,
      name,
      email,
      twitterHandle,
    );
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get('users/:walletAddress')
  async getUser(@Param('walletAddress') walletAddress: string) {
    return await this.userService.findUsersByWalletAddress(walletAddress);
  }
}
