import { Module } from '@nestjs/common';
import { MindsetController } from './mindset.controller';
import { MindsetService } from './mindset.service';

@Module({
    controllers: [MindsetController],
    providers: [MindsetService],
    exports: [MindsetService],
})
export class MindsetModule { }
