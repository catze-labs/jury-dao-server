import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createNonceResponse } from './responseSchema';
import { CreateNonceDto } from '../dtos/createNonce.dto';
import { NonceService } from '../../services/nonce/nonce.service';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';

@Controller('nonce')
@ApiTags('Nonce')
export class NonceController {
  constructor(private readonly nonceService: NonceService) {}

  @Post()
  @ApiResponse(createNonceResponse)
  @UseGuards(JwtAuthGuard)
  async createNonce(@Body() createNonceDto: CreateNonceDto) {
    const { walletAddress } = createNonceDto;
    const nonce: string = await this.nonceService.create(walletAddress);
    return { nonce };
  }
}
