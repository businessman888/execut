import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';

@ApiTags('gamification')
@ApiBearerAuth()
@Controller('gamification')
export class GamificationController {
    constructor(private readonly gamificationService: GamificationService) { }

    @Get('xp/:userId')
    @ApiOperation({ summary: 'Obter XP e nível do usuário' })
    async getXP(@Param('userId') userId: string) {
        return this.gamificationService.getXPAndLevel(userId);
    }

    @Post('xp/:userId/award')
    @ApiOperation({ summary: 'Conceder XP ao usuário' })
    async awardXP(
        @Param('userId') userId: string,
        @Body() body: { amount: number; reason: string },
    ) {
        return this.gamificationService.awardXP(userId, body.amount, body.reason);
    }

    @Get('achievements/:userId')
    @ApiOperation({ summary: 'Obter conquistas do usuário' })
    async getAchievements(@Param('userId') userId: string) {
        return this.gamificationService.getAchievements(userId);
    }

    @Get('streak/:userId')
    @ApiOperation({ summary: 'Obter streak do usuário' })
    async getStreak(@Param('userId') userId: string) {
        return this.gamificationService.getStreak(userId);
    }
}
