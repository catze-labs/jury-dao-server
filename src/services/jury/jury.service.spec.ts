import { Test, TestingModule } from '@nestjs/testing';
import { JuryService } from './jury.service';

describe('JuryService', () => {
  let service: JuryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuryService],
    }).compile();

    service = module.get<JuryService>(JuryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
