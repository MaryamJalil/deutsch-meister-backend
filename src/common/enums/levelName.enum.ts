import { registerEnumType } from '@nestjs/graphql';

export enum LevelName {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
}

registerEnumType(LevelName, {
  name: 'LevelName',
});
