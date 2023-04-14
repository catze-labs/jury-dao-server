import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {UserService} from 'src/services/user/user.service';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly userService : UserService) {}

  @Post('/login')
  async login(@Body('walletAddress') walletAddress: string) {
	  return await this.userService.login(walletAddress)
  }
}
