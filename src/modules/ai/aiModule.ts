import { Module } from '@nestjs/common';
import { AIContentGeneratorService } from './aiContentGenerator.service';
import { AITutorService } from './aiTutor.service';
import { VectorSearchService } from './vectorSearch.service';
import { AIResolver } from './aiResolver';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsResolver } from './flashcards.resolver';
import { PronunciationService } from './pronunciation.service';
import { PronunciationResolver } from './pronunciation.resolver';
import { SpacedRepetitionService } from './spacedRepetition.service';

@Module({
    providers: [
        AIContentGeneratorService,
        AITutorService,
        VectorSearchService,
        AIResolver,
        FlashcardsService,
        FlashcardsResolver,
        PronunciationService,
        PronunciationResolver,
        SpacedRepetitionService,
    ],
    exports: [
        AIContentGeneratorService,
        AITutorService,
        VectorSearchService,
        FlashcardsService,
        PronunciationService,
        SpacedRepetitionService,
    ],
})
export class AIModule { }
