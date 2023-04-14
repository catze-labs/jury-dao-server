import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class JuryService {
  constructor(private readonly ps: PrismaService) {}

  public async create() {
    return Promise.resolve(undefined);
  }

  public async getJuries() {
    return Promise.resolve(undefined);
  }

  public async getJury(juryId: number) {
    return Promise.resolve(undefined);
  }

  public async patchJury(juryId: number) {
    return Promise.resolve(undefined);
  }

  public async createVote(juryId: number) {
    return Promise.resolve(undefined);
  }

  public async createComment(juryId: number) {
    return Promise.resolve(undefined);
  }

  public async getComments() {
    return Promise.resolve(undefined);
  }

  public async deleteComment(
    userId: number,
    juryId: number,
    commentId: number,
  ): Promise<void> {
    const comment = await this.ps.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (comment == null) {
      throw new Error('Comment not found');
    } else {
      if (comment.userId !== userId) {
        throw new Error('You are not the owner of this comment');
      }
      await this.ps.comment.delete({
        where: {
          id: commentId,
        },
      });
    }
  }
}
