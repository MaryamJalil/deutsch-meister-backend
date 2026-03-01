import { registerEnumType } from '@nestjs/graphql/dist';

export enum ExcerciseType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
  SENTENCE_ORDERING = 'SENTENCE_ORDERING',
  LISTENING_COMPREHENSION = 'LISTENING_COMPREHENSION',
}
registerEnumType(ExcerciseType, {
  name: 'ExcerciseType',
  description: 'Type of exercise presented to the learner',
});
