import {
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

@Controller('juries')
@ApiTags('Jury')
export class JuryController {
  constructor(private readonly juryService: JuryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create() {
    return this.juryService.create();
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
  async createVote(@Param('juryId') juryId: number) {
    return this.juryService.createVote(juryId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':juryId/comments')
  async createComment(@Param('juryId') juryId: number) {
    return this.juryService.createComment(juryId);
  }

  @Get(':juryId/comments')
  async getComments(@Param('juryId') juryId: number) {
    return this.juryService.getComments();
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
