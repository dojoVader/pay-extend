import { Test, TestingModule } from '@nestjs/testing';
import { LiquidServiceService } from './liquid.service';

describe('LiquidServiceService', () => {
  let service: LiquidServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiquidServiceService],
    }).compile();

    service = module.get<LiquidServiceService>(LiquidServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
