import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor() {}

  @Post('/login')
  async login(@Body('email') email: string) {
    // TODO add JWT login logic
    return true;
  }
}
