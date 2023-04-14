import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
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
  async getJuries(@Request() req: any) {
    return this.juryService.getJuries();
  }

  @Get(':juryId')
  async getJury(@Request() req: any) {
    return this.juryService.getJury();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':juryId')
  async patchJury(@Request() req: any) {
    return this.juryService.patchJury();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':juryId/votes')
  async createVote() {
    return this.juryService.createVote();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':juryId/comments')
  async createComment() {
    return this.juryService.createComment();
  }

  @Get(':juryId/comments')
  async getComments() {
    return this.juryService.getComments();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':juryId/comments/:commentId')
  async deleteComment() {
    return this.juryService.deleteComment();
  }
}
