import { Module } from '@nestjs/common';
import { AIContentGeneratorService } from './ai-content-generator.service';
import { AITutorService } from './ai-tutor.service';
import { VectorSearchService } from './vector-search.service';
import { AIResolver } from './ai.resolver';

@Module({
  providers: [
    AIContentGeneratorService,
    AITutorService,
    VectorSearchService,
    AIResolver,
  ],
  exports: [
    AIContentGeneratorService,
    AITutorService,
    VectorSearchService,
  ],
})
export class AIModule {}
