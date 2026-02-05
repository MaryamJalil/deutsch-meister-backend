import { Module } from '@nestjs/common';
import { VocabularyResolver } from './vocabulary.resolver';
import { VocabularyService } from './vocabulary.service';

@Module({
  imports: [],
  providers: [VocabularyResolver, VocabularyService],
})
export class VocabularyModule {}
