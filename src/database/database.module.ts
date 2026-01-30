import { Module, Global } from '@nestjs/common';
import { db } from './drizzle';

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      useValue: db,
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
