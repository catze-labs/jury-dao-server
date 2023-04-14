import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  readonly juryId;

  @IsInt()
  readonly userId;

  @IsString()
  readonly content;
}
