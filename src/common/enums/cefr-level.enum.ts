import { registerEnumType } from '@nestjs/graphql';

export enum CEFRLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
}

registerEnumType(CEFRLevel, {
  name: 'CEFRLevel',
  description: 'Common European Framework of Reference for Languages levels',
});
