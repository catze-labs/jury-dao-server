import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async register(
    walletAddress: string,
    name: string,
    email?: string,
    twitterHandle?: string,
  ) {
    const user = await this.prismaService.user.count({
      where: {
        walletAddress,
      },
    });

    if (user) {
      throw new ConflictException({
        message: 'Already the same wallet address exists',
      });
    }

    return await this.prismaService.user.create({
      data: {
        walletAddress,
        name,
        email,
        twitterHandle,
      },
    });
  }

  public async findUsersByWalletAddress(walletAddress: string) {
    return await this.prismaService.user.findMany({
      where: {
        walletAddress,
      },
    });
  }

  public async getUserById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
