import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import type Table from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { JuryService } from '../../services/jury/jury.service';
import { CreateJuryDto } from '../dtos/createJury.dto';
import { CreateVoteDto } from '../dtos/createVote.dto';
import { CreateCommentDto } from '../dtos/createComment.dto';
import { PatchJuryDto } from '../dtos/patchJury.dto';
import { SignatureService } from '../../services/signature/signature.service';
import { SignatureDto } from '../dtos/signature.dto';
import { getUser } from 'src/decorators/getUser.decorator';
import { PaginationDto } from '../dtos/pagination.dto';

@Controller('juries')
@ApiTags('Jury')
export class JuryController {
  constructor(
    private readonly juryService: JuryService,
    private readonly signatureService: SignatureService,
  ) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createJury(
    @Body() createJuryDto: CreateJuryDto,
    @Body() signatureDto: SignatureDto,
    @getUser() user: Table.user,
  ) {
    const { walletAddress, signature } = signatureDto;
    const userAddress: string | undefined =
      await this.signatureService.getAddress(walletAddress, signature);
    this.signatureService.validateUserWalletAddress(userAddress, walletAddress);

    return this.juryService.create(createJuryDto);
  }

  @Get('')
  async getJuries(@Query() paginationDto: PaginationDto) {
    const { page, size } = paginationDto;
    return this.juryService.getJuries(page, size);
  }

  @Get(':juryId')
  async getJury(@Param('juryId', ParseIntPipe) juryId: number) {
    return this.juryService.getJury(juryId);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch(':juryId')
  async patchJury(
    @Param('juryId') juryId: number,
    @Body() patchJuryDto: PatchJuryDto,
    @Body() signatureDto: SignatureDto,
    @getUser() user: Table.user,
  ) {
    const { walletAddress, signature } = signatureDto;
    const userAddress: string | undefined =
      await this.signatureService.getAddress(walletAddress, signature);
    this.signatureService.validateUserWalletAddress(userAddress, walletAddress);

    return this.juryService.patchJury(juryId, user.id, patchJuryDto);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post(':juryId/votes')
  async createVote(
    @Param('juryId', ParseIntPipe) juryId: number,
    @Body() createVoteDto: CreateVoteDto,
    @Body() signatureDto: SignatureDto,
    @getUser() user: Table.user,
  ) {
    const { walletAddress, signature } = signatureDto;
    const userAddress: string | undefined =
      await this.signatureService.getAddress(walletAddress, signature);
    this.signatureService.validateUserWalletAddress(userAddress, walletAddress);
    return this.juryService.createVote(juryId, createVoteDto);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post(':juryId/comments')
  async createComment(
    @Param('juryId', ParseIntPipe) juryId: number,
    @Body() createCommentDto: CreateCommentDto,
    @getUser() user: Table.user,
  ) {
    const userId = user.id;
    const { content } = createCommentDto;
    return this.juryService.createComment(juryId, userId, content);
  }

  @Get(':juryId/comments')
  async getComments(
    @Param('juryId', ParseIntPipe) juryId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    const { page, size } = paginationDto;
    return this.juryService.getComments(juryId, page, size);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Delete(':juryId/comments/:commentId')
  async deleteComment(
    @Param('juryId', ParseIntPipe) juryId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    const userId = 1;

    return this.juryService.deleteComment(userId, juryId, commentId);
  }
}
