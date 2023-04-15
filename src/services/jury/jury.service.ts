import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateJuryDto } from '../../routes/dtos/createJury.dto';
import Table, { Prisma } from '@prisma/client';
import { PatchJuryDto } from '../../routes/dtos/patchJury.dto';
import { CreateVoteDto } from '../../routes/dtos/createVote.dto';

@Injectable()
export class JuryService {
  constructor(private readonly ps: PrismaService) {}

  private adjustPagination(page: number, size: number) {
    if (page < 1) {
      page = 1;
    }
    if (size < 1) {
      size = 1;
    }
    if (size > 50) {
      size = 50;
    }
    return { page, size };
  }

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

  public async getJuries(page: number, size: number) {
    const adjustedPagination = this.adjustPagination(page, size);

    return this.ps.jury.findMany({
      include: {
        plaintiff: true,
        defendant: true,
      },
      take: adjustedPagination.size,
      skip: (adjustedPagination.page - 1) * adjustedPagination.size,
    });
  }

  public async getJury(juryId: number) {
    return this.getJuryOrThrow(juryId);
  }

  public async patchJury(
    juryId: number,
    userId: number,
    patchJuryDto: PatchJuryDto,
  ): Promise<Table.jury> {
    const jury = await this.getJuryOrThrow(juryId);
    if (jury.defendantId !== userId) {
      throw new ForbiddenException("You can't patch this jury");
    }
    if (jury.defendantTitle !== null) {
      throw new ForbiddenException('This jury already has been defended');
    }

    return this.ps.jury.update({
      where: {
        id: juryId,
      },
      data: {
        defendantTitle: patchJuryDto.defendantTitle,
        defendantContent: patchJuryDto.defendantContent,
        defendantReferenceLink:
          patchJuryDto.defendantReferenceLink as Prisma.InputJsonArray,
      },
    });
  }

  public async createVote(
    juryId: number,
    userId: number,
    createVoteDto: CreateVoteDto,
  ) {
    await this.getJuryOrThrow(juryId);
    const vote = this.ps.vote.findUnique({
      where: {
        userId_juryId_unique_constraint: {
          juryId,
          userId,
        },
      },
    });
    if (vote != null) {
      throw new ForbiddenException('You already voted for this jury');
    }

    const data: Prisma.voteCreateInput = {
      flag: createVoteDto.flag,
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
    };

    return this.ps.vote.create({
      data,
    });
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
    const adjustedPagination = this.adjustPagination(page, size);

    return this.ps.comment.findMany({
      where: {
        juryId,
      },
      include: {
        user: true,
      },
      take: adjustedPagination.size,
      skip: (adjustedPagination.page - 1) * adjustedPagination.size,
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

  private async getJuryOrThrow(
    juryId: number,
  ): Promise<Table.jury & { plaintiff: Table.user; defendant: Table.user }> {
    const jury = await this.ps.jury.findUnique({
      where: {
        id: juryId,
      },
      include: {
        plaintiff: true,
        defendant: true,
      },
    });
    if (jury == null) {
      throw new NotFoundException({ message: 'Jury not found' });
    }

    return jury;
  }
}
