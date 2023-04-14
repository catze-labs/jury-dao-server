import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Md5 } from 'ts-md5';

@Injectable()
export class NonceService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(walletAddress: string): Promise<string> {
    let randomAlphaNumericString = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      randomAlphaNumericString += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }

    const randomStr: string = Md5.hashStr(
      Date.now().toString() + randomAlphaNumericString,
    );
    const value: string =
      '\x19Ethereum Signed Message:\n' + randomStr.length + randomStr;
    await this.prismaService.nonce.create({
      data: {
        address: walletAddress,
        value,
      },
    });

    return value;
  }
}
