import { Module } from '@nestjs/common';
import { AIContentGeneratorService } from './ai-content-generator.service.js';
import { AITutorService } from './ai-tutor.service.js';
import { VectorSearchService } from './vector-search.service.js';
import { AIResolver } from './ai.resolver.js';

@Module({
  imports: [],
  // imports = Other modules this module needs

  providers: [
    AIContentGeneratorService, // Makes this service available
    AITutorService,
    VectorSearchService,
    AIResolver,
  ],
  // providers = Classes that can be injected into other classes

  exports: [
    AIContentGeneratorService, // Other modules can use these
    AITutorService,
    VectorSearchService,
  ],
  // exports = Make these available to other modules
})
export class AIModule {}
