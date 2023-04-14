import { PartialType } from '@nestjs/mapped-types';
import { CreateJuryDto } from './createJury.dto';

export class PatchJuryDto extends PartialType(CreateJuryDto) {}
