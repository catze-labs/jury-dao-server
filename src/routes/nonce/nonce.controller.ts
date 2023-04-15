import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createNonceResponse } from './responseSchema';
import { NonceService } from '../../services/nonce/nonce.service';
import { CreateNonceDto } from '../dtos/createNonce.dto';

@Controller('nonce')
@ApiTags('Nonce')
export class NonceController {
  constructor(private readonly nonceService: NonceService) {}

  @Post()
  @ApiResponse(createNonceResponse)
  async createNonce(@Body() createNonceDto: CreateNonceDto) {
    const nonce: string = await this.nonceService.create(
      createNonceDto.walletAddress,
    );
    return { nonce };
  }
}
