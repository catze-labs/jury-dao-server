import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { getUser } from 'src/decorators/getUser.decorator';
import { SignatureDto } from '../dtos/signature.dto';
import { SignatureService } from '../../services/signature/signature.service';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService, private readonly signatureService : SignatureService) {}
  constructor(
    private readonly userService: UserService,
    private readonly signatureService: SignatureService,
  ) {}

  @Post('users')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Body() signatureDto: SignatureDto,
  ) {
    const { walletAddress, name, email, twitterHandle } = registerUserDto;

    const { signature } = signatureDto;
    const userAddress: string | undefined =
      await this.signatureService.getAddress(walletAddress, signature);
    this.signatureService.validateUserWalletAddress(userAddress, walletAddress);

    return this.userService.register(
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
