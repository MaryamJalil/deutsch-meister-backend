import { Test, TestingModule } from '@nestjs/testing';
import { ExcercisesResolver } from './excercises.resolver';

describe('ExcercisesResolver', () => {
  let resolver: ExcercisesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcercisesResolver],
    }).compile();

    resolver = module.get<ExcercisesResolver>(ExcercisesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
