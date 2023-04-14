import { Test, TestingModule } from '@nestjs/testing';
import { NonceController } from './nonce.controller';

describe('NonceController', () => {
  let controller: NonceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonceController],
    }).compile();

    controller = module.get<NonceController>(NonceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
