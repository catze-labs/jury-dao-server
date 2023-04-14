import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { JuryService } from '../../services/jury/jury.service';
import { CreateJuryDto } from '../dtos/createJury.dto';
import { CreateVoteDto } from '../dtos/createVote.dto';
import { CreateCommentDto } from '../dtos/createComment.dto';

@Controller('juries')
@ApiTags('Jury')
export class JuryController {
  constructor(private readonly juryService: JuryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() createJuryDto: CreateJuryDto) {
    return this.juryService.create(createJuryDto);
  }

  @Get('')
  async getJuries() {
    return this.juryService.getJuries();
  }

  @Get(':juryId')
  async getJury(@Param('juryId') juryId: number) {
    return this.juryService.getJury(juryId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':juryId')
  async patchJury(@Param('juryId') juryId: number) {
    return this.juryService.patchJury(juryId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':juryId/votes')
  async createVote(
    @Param('juryId') juryId: number,
    @Body() createVoteDto: CreateVoteDto,
  ) {
    return this.juryService.createVote(juryId, createVoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':juryId/comments')
  async createComment(
    @Param('juryId') juryId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.juryService.createComment(juryId, createCommentDto);
  }

  @Get(':juryId/comments')
  async getComments(@Param('juryId') juryId: number) {
    return this.juryService.getComments(juryId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':juryId/comments/:commentId')
  async deleteComment(
    @Param('juryId') juryId: number,
    @Param('commentId') commentId: number,
  ) {
    const userId = 1;

    return this.juryService.deleteComment(userId, juryId, commentId);
  }
}
