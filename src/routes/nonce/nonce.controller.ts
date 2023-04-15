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
  @UseGuards(JwtAuthGuard)
  async createNonce(@getUser() user: Table.user) {
    const nonce: string = await this.nonceService.create(user.walletAddress);
    return { nonce };
  }
}
