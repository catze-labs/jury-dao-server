import { IsArray, IsOptional, IsString } from 'class-validator';

export class PatchJuryDto {
  @IsString()
  readonly defendantTitle;

  @IsString()
  readonly defendantContent;

  @IsArray()
  @IsOptional()
  readonly defendantReferenceLink;
}
