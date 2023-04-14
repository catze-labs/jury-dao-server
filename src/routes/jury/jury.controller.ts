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
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';

@Controller('juries')
@ApiTags('Jury')
export class JuryController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create() {
    return true;
  }

  @Get('')
  async getJuries(@Request() req: any) {
    return true;
  }

  @Get(':juryId')
  async getJury(@Request() req: any) {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':juryId')
  async patchJury(@Request() req: any) {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':juryId/votes')
  async createVote() {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':juryId/comments')
  async createComment() {
    return true;
  }

  @Get(':juryId/comments')
  async getComments() {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':juryId/comments/:commentId')
  async deleteComment() {
    return true;
  }
}
