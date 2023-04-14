import { Controller, Get, Post, Request, UseGuards ,Body, Param} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async register(
	@Body('walletAddress') walletAddress : string,
	@Body('name') name : string,
	@Body('email') email?: string,
	@Body('twitterHandle') twitterHandle? : string
  ) {
    return await this.userService.register(walletAddress, name, email, twitterHandle);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:walletAddress')
  async getUser(@Param('walletAddress') walletAddress : string) {
	  return await this.userService.findUsersByWalletAddress(walletAddress)
  }
}
