import { Module } from '@nestjs/common';
import { ModuleService } from './modules.service';
import { ModulesResolver } from './modules.resolver';
@Module({
  imports: [],
  providers: [ModuleService, ModulesResolver],
})
export class ModulesModule {}
