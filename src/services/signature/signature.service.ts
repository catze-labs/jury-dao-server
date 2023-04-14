import { verifyMessage } from '@ethersproject/wallet';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SignatureService {
  constructor(private readonly prismaService: PrismaService) {}

  public validateUserWalletAddress(
    apiCallerAddress: string | undefined,
    compareWalletAddress: string | undefined,
  ): void {
    if (
      !apiCallerAddress ||
      !compareWalletAddress ||
      apiCallerAddress !== compareWalletAddress
    ) {
      throw new ForbiddenException({
        message: 'Permission denied',
        data: {
          apiCallerAddress,
          compareWalletAddress,
        },
      });
    }
  }

  public async getAddress(
    walletAddress: string,
    signature: string,
  ): Promise<string | undefined> {
    const nonce = await this.prismaService.nonce.findFirst({
      where: {
        address: walletAddress,
        used: false,
      },
      orderBy: {
        id: 'desc',
      },
    });
    if (nonce !== null) {
      await this.prismaService.nonce.update({
        where: {
          id: nonce.id,
        },
        data: {
          used: true,
        },
      });

      let recoveredAddress: string | undefined;
      recoveredAddress = verifyMessage(nonce.value, signature);
      return recoveredAddress;
    }
  }
}
