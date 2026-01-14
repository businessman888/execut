import { Module } from '@nestjs/common';
import { HallOfFameController } from './hall-of-fame.controller';
import { HallOfFameService } from './hall-of-fame.service';

@Module({
    controllers: [HallOfFameController],
    providers: [HallOfFameService],
    exports: [HallOfFameService],
})
export class HallOfFameModule { }
