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
import { GetJuriesFilter } from '../../constants';

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

  public async getJuries(
    page: number,
    size: number,
    filter?: GetJuriesFilter,
    userId?: number,
  ) {
    const adjustedPagination = this.adjustPagination(page, size);
    let where = {};
    if (filter === GetJuriesFilter.ALL_OF_MINE) {
      where = {
        OR: [{ plaintiffId: userId }, { defendantId: userId }],
      };
    } else if (filter === GetJuriesFilter.AS_DEFENDANT) {
      where = {
        defendantId: userId,
      };
    } else if (filter === GetJuriesFilter.AS_PLAINTIFF) {
      where = {
        plaintiffId: userId,
      };
    }

    const [list, count] = await Promise.all([
      this.ps.jury.findMany({
        include: {
          plaintiff: true,
          defendant: true,
        },
        where,
        take: adjustedPagination.size,
        skip: (adjustedPagination.page - 1) * adjustedPagination.size,
      }),
      this.ps.jury.count({
        where,
      }),
    ]);

    return { list, count };
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
    const jury = await this.getJuryOrThrow(juryId);
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
      step: jury.step,
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

    const [count, list] = await Promise.all([
      this.ps.comment.count({
        where: {
          juryId,
        },
      }),
      this.ps.comment.findMany({
        where: {
          juryId,
        },
        include: {
          user: true,
        },
        take: adjustedPagination.size,
        skip: (adjustedPagination.page - 1) * adjustedPagination.size,
      }),
    ]);

    return { count, list };
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

  private async getJuryOrThrow(juryId: number) {
    const jury = await this.ps.jury.findUnique({
      where: {
        id: juryId,
      },
      include: {
        plaintiff: true,
        defendant: true,
        votes: true,
      },
    });
    if (jury == null) {
      throw new NotFoundException({ message: 'Jury not found' });
    }
    let step1PlaintiffVoteCount = 0;
    let step1DefendantVoteCount = 0;
    let step2PlaintiffVoteCount = 0;
    let step2DefendantVoteCount = 0;
    jury.votes.forEach((vote) => {
      vote.flag
        ? vote.step === 1
          ? step1PlaintiffVoteCount++
          : step1DefendantVoteCount++
        : vote.step === 2
        ? step2PlaintiffVoteCount++
        : step2DefendantVoteCount++;
    });
    const { votes, ...remain } = jury;

    return {
      ...remain,
      step1PlaintiffVoteCount,
      step1DefendantVoteCount,
      step2PlaintiffVoteCount,
      step2DefendantVoteCount,
    };
  }
}
