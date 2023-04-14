import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateJuryDto } from '../../routes/dtos/createJury.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class JuryService {
  constructor(private readonly ps: PrismaService) {}

  public async create(createJuryDto: CreateJuryDto) {
    const {
      plaintiffId,
      plaintiffTitle,
      plaintiffContent,
      plaintiffReferenceLink,
      defendantId,
    } = createJuryDto;

    const data: Prisma.juryCreateInput = {
      plaintiff: {
        connect: {
          id: plaintiffId,
        },
      },
      defendant: {
        connect: {
          id: defendantId,
        },
      },
      plaintiffTitle,
      plaintiffContent,
      plaintiffReferenceLink: plaintiffReferenceLink as Prisma.InputJsonArray,
    };

    return this.ps.jury.create({
      data,
    });
  }

  public async getJuries() {
    return this.ps.jury.findMany();
  }

  private async getJuryOrThrow(juryId: number) {
    const jury = await this.ps.jury.findUnique({
      where: {
        id: juryId,
      },
    });

    if (jury == null) {
      throw new Error('Jury not found');
    }

    return jury;
  }

  public async getJury(juryId: number) {
    return await this.getJuryOrThrow(juryId);
  }

  public async patchJury(juryId: number) {
    const jury = await this.getJuryOrThrow(juryId);
    return Promise.resolve(undefined);
  }

  public async createVote(juryId: number, voteData: object) {
    const jury = await this.getJuryOrThrow(juryId);
    // return this.ps.vote.create({
    //   data: voteData
    // })
  }

  public async createComment(juryId: number, commentData: object) {
    const jury = await this.getJuryOrThrow(juryId);
    return Promise.resolve(undefined);
  }

  public async getComments(juryId: number) {
    const jury = await this.getJuryOrThrow(juryId);
    return this.ps.comment.findMany({
      where: {
        juryId,
      },
    });
  }

  public async deleteComment(
    userId: number,
    juryId: number,
    commentId: number,
  ): Promise<void> {
    await this.getJuryOrThrow(juryId);
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
