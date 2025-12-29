import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProgressResolver } from './progress.resolver';
import { ProgressService } from './progress.service';

@Module({
  imports: [PrismaModule],
  providers: [ProgressResolver, ProgressService],
})
export class ProgressModule {}
