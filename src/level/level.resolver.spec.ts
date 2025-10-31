import { Test, TestingModule } from '@nestjs/testing';
import { LevelResolver } from './level.resolver';

describe('LevelResolver', () => {
  let resolver: LevelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelResolver],
    }).compile();

    resolver = module.get<LevelResolver>(LevelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
