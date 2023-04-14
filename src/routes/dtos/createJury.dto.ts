import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateJuryDto {
  @IsInt()
  readonly plaintiffId;

  @IsString()
  @IsNotEmpty()
  readonly plaintiffTitle;

  @IsString()
  @IsNotEmpty()
  readonly plaintiffContent;

  @IsArray()
  @IsOptional()
  readonly plaintiffReferenceLink;

  @IsInt()
  readonly defendantId;
}
