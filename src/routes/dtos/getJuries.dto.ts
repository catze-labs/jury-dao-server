import { IsEnum } from 'class-validator';
import { GetJuriesFilter } from '../../constants';

export class GetJuriesDto {
  @IsEnum(GetJuriesFilter)
  readonly filter;
}
