import { Controller, Post, UseGuards } from '@nestjs/common';
import type Table from '@prisma/client';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createNonceResponse } from './responseSchema';
import { NonceService } from '../../services/nonce/nonce.service';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { getUser } from '../../decorators/getUser.decorator';

@Controller('nonce')
@ApiTags('Nonce')
export class NonceController {
  constructor(private readonly nonceService: NonceService) {}

  @Post()
  @ApiResponse(createNonceResponse)
  async createNonce(@Body('walletAddress') walletAddress : string) {
    const nonce: string = await this.nonceService.create(user.walletAddress);
    return { nonce };
  }
}
