import { IsBoolean } from 'class-validator';

export class CreateVoteDto {
  @IsBoolean()
  readonly flag;
}
