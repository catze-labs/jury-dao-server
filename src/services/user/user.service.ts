import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async register() {}

  public async login(email: string, password: string) {}

  public async getUserById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
