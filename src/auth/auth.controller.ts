import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import {authResponse} from './responseSchema';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @ApiResponse(authResponse)
  async login(@Body() authDto: AuthDto) {
    const { walletAddress } = authDto;
    return this.authService.login(walletAddress);
  }
}
