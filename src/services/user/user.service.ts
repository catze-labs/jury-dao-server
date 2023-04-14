import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  public async login(walletAddress: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        walletAddress,
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    const payload = { ...user };
    const jwt = this.jwtService.sign(payload);

    return { accessToken: jwt };
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
