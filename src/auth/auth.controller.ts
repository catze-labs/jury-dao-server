import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/services/user/user.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async login(@Body() authDto: AuthDto) {
    const { walletAddress } = authDto;
    return await this.userService.login(walletAddress);
  }
}
