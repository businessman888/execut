import { Module } from '@nestjs/common';
import { AIAgentService } from './ai-agent.service';

@Module({
    providers: [AIAgentService],
    exports: [AIAgentService],
})
export class AIAgentModule { }
