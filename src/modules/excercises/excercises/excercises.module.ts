import { Module } from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { ExercisesResolver } from '../excercises.resolver';
import { AIModule } from '../../../modules/ai/aiModule';

@Module({
  imports: [AIModule],
  providers: [ExcercisesService, ExercisesResolver],
  exports: [ExcercisesService],
})
export class ExcercisesModule {}
