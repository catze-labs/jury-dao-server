import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatchJuryDto {
  @IsString()
  @IsNotEmpty()
  readonly defendantTitle;

  @IsString()
  @IsNotEmpty()
  readonly defendantContent;

  @IsArray()
  @IsOptional()
  readonly defendantReferenceLink;
}
