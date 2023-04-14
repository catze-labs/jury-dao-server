import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class JuryService {
  constructor(private readonly prismaService: PrismaService) {}

  public create() {
    return Promise.resolve(undefined);
  }

  public getJuries() {
    return Promise.resolve(undefined);
  }

  public getJury() {
    return Promise.resolve(undefined);
  }

  public patchJury() {
    return Promise.resolve(undefined);
  }

  public createVote() {
    return Promise.resolve(undefined);
  }

  public createComment() {
    return Promise.resolve(undefined);
  }

  public getComments() {
    return Promise.resolve(undefined);
  }

  public deleteComment() {
    return Promise.resolve(undefined);
  }
}
