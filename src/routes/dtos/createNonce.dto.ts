import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNonceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
