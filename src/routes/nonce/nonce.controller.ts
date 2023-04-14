import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createNonceResponse } from './responseSchema';
import { CreateNonceDto } from '../dtos/createNonce.dto';
import { NonceService } from '../../services/nonce/nonce.service';

@Controller('nonce')
@ApiTags('Nonce')
export class NonceController {
  constructor(private readonly nonceService: NonceService) {}

  @Post()
  @ApiResponse(createNonceResponse)
  async createNonce(@Body() createNonceDto: CreateNonceDto) {
    const { walletAddress } = createNonceDto;
    const nonce: string = await this.nonceService.create(walletAddress);
    return { nonce };
  }
}
