import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import {AuthService} from './auth.service';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService : AuthService) {}

  @Post('')
  async login(@Body() authDto: AuthDto) {
    const { walletAddress } = authDto;
    return await this.authService.login(walletAddress);
  }
}
