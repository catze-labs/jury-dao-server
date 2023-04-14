import { IsBoolean, IsInt } from 'class-validator';

export class CreateVoteDto {
  @IsBoolean()
  readonly flag;

  @IsInt()
  readonly juryId;

  @IsInt()
  readonly userId;
}
