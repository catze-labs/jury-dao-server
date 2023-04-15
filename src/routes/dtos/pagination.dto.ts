import { IsInt } from 'class-validator';

export class PaginationDto {
  @IsInt()
  readonly page: number;

  @IsInt()
  readonly size: number;
}
