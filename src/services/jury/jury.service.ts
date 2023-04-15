import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateJuryDto } from '../../routes/dtos/createJury.dto';
import { Prisma } from '@prisma/client';
import { PatchJuryDto } from '../../routes/dtos/patchJury.dto';

@Injectable()
export class JuryService {
  constructor(private readonly ps: PrismaService) {}

  public async create(createJuryDto: CreateJuryDto) {
    // TODO: check signature
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

  public async getJuries(page: number, size: number) {
    if (page < 1) {
      page = 1;
    }
    return this.ps.jury.findMany({
      include: {
        plaintiff: true,
        defendant: true,
      },
      take: size,
      skip: (page - 1) * size,
    });
  }

  public async getJury(juryId: number) {
    return this.getJuryOrThrow(juryId);
  }

  public async patchJury(juryId: number, patchJuryDto: PatchJuryDto) {
    // TODO: check signature
    const jury = await this.getJuryOrThrow(juryId);
    // TODO: check user is a defendant of the jury
    // if (jury.defendantId == userId) {
    //
    // }

    return Promise.resolve(undefined);
  }

  public async createVote(juryId: number, voteData: object) {
    const jury = await this.getJuryOrThrow(juryId);
    // return this.ps.vote.create({
    //   data: voteData
    // })
  }

  public async createComment(juryId: number, userId: number, content: string) {
    await this.getJuryOrThrow(juryId);
    const data: Prisma.commentCreateInput = {
      jury: {
        connect: {
          id: juryId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      content,
    };
    return this.ps.comment.create({
      data,
    });
  }

  public async getComments(juryId: number, page: number, size: number) {
    await this.getJuryOrThrow(juryId);
    if (page < 1) {
      page = 1;
    }

    return this.ps.comment.findMany({
      where: {
        juryId,
      },
      include: {
        user: true,
      },
      take: size,
      skip: (page - 1) * size,
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
      throw new NotFoundException({
        message: 'Comment not found',
      });
    } else {
      if (comment.userId !== userId) {
        throw new ForbiddenException({
          message: 'You are not the owner of this comment',
        });
      }
      await this.ps.comment.delete({
        where: {
          id: commentId,
        },
      });
    }
  }

  private async getJuryOrThrow(juryId: number) {
    const jury = await this.ps.jury.findUnique({
      where: {
        id: juryId,
      },
      include: {
        plaintiff: true,
        defendant: true,
      },
    });
    console.log('Jury found');
    if (jury == null) {
      console.log('Jury not found');
      throw new NotFoundException({ message: 'Jury not found' });
    }

    return jury;
  }
}
