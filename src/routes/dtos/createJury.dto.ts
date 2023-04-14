import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateJuryDto {
  @IsInt()
  readonly plaintiffId;

  @IsString()
  readonly plaintiffTitle;

  @IsString()
  readonly plaintiffContent;

  @IsArray()
  @IsOptional()
  readonly plaintiffReferenceLink;

  @IsInt()
  readonly defendantId;

  @IsString()
  @IsOptional()
  readonly defendantTitle;

  @IsString()
  @IsOptional()
  readonly defendantContent;

  @IsArray()
  @IsOptional()
  readonly defendantReferenceLink;
}
