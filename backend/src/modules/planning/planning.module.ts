import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { AIAgentModule } from '../ai-agent/ai-agent.module';

@Module({
    imports: [AIAgentModule],
    controllers: [PlanningController],
    providers: [PlanningService],
    exports: [PlanningService],
})
export class PlanningModule { }
