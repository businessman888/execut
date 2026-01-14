import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GoalsModule } from './modules/goals/goals.module';
import { PlanningModule } from './modules/planning/planning.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { AIAgentModule } from './modules/ai-agent/ai-agent.module';
import { HallOfFameModule } from './modules/hall-of-fame/hall-of-fame.module';
import { WellnessModule } from './modules/wellness/wellness.module';
import { MindsetModule } from './modules/mindset/mindset.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SupabaseModule } from './database/supabase.module';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Database
        SupabaseModule,

        // Feature modules
        AuthModule,
        UsersModule,
        GoalsModule,
        PlanningModule,
        GamificationModule,
        AIAgentModule,
        HallOfFameModule,
        WellnessModule,
        MindsetModule,
        NotificationsModule,
    ],
})
export class AppModule { }
