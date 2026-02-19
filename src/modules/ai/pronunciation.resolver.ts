import { Resolver, Query, Args, ObjectType, Field } from '@nestjs/graphql';
import { PronunciationService } from './pronunciation.service';

@ObjectType()
class PhoneticResult {
    @Field() ipa!: string;
    @Field() simplified!: string;
}

@Resolver()
export class PronunciationResolver {
    constructor(private readonly pronunciation: PronunciationService) { }

    @Query(() => PhoneticResult)
    async phonetic(@Args('text') text: string, @Args('language', { defaultValue: 'German' }) language: string) {
        return this.pronunciation.phonetic(text, language);
    }
}
