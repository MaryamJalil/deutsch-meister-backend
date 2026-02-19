import { Resolver, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { FlashcardsService, Flashcard } from './flashcards.service';

@ObjectType()
class FlashcardObject {
    @Field() front!: string;
    @Field() back!: string;
    @Field({ nullable: true }) example?: string;
}

@Resolver()
export class FlashcardsResolver {
    constructor(private readonly flashcards: FlashcardsService) { }

    @Mutation(() => [FlashcardObject])
    async generateFlashcards(
        @Args('text') text: string,
        @Args('count', { type: () => Int, defaultValue: 10 }) count: number,
        @Args('level', { defaultValue: 'A1' }) level: string,
    ) {
        return this.flashcards.generateFlashcards(text, count, level);
    }
}
