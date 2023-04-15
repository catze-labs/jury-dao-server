import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { getUser } from 'src/decorators/getUser.decorator';
import { SignatureDto } from '../dtos/signature.dto';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Body() signatureDto: SignatureDto,
  ) {
    const { walletAddress, signature } = signatureDto;
    const userAddress: string | undefined =
      await this.signatureService.getAddress(walletAddress, signature);
    this.signatureService.validateUserWalletAddress(userAddress, walletAddress);

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
  async getProfile(@getUser() user: any) {
    return user;
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get('users/:walletAddress')
  async getUser(@Param('walletAddress') walletAddress: string) {
    return await this.userService.findUsersByWalletAddress(walletAddress);
  }
}
