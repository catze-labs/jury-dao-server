import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async register() {
    return await this.userService.register();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    // user object will be parsed by jwt guard (JwtStrategy - validate)
    console.log(req.user);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:walletAddress')
  async getUser(@Request() req: any) {
    // user object will be parsed by jwt guard (JwtStrategy - validate)
    console.log(req.user);
    return req.user;
  }
}
