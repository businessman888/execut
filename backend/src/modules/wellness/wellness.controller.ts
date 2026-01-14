import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WellnessService } from './wellness.service';

@ApiTags('wellness')
@ApiBearerAuth()
@Controller('wellness')
export class WellnessController {
    constructor(private readonly wellnessService: WellnessService) { }

    @Get(':userId')
    @ApiOperation({ summary: 'Obter registros de bem-estar' })
    async getWellnessRecords(
        @Param('userId') userId: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.wellnessService.getRecords(userId, startDate, endDate);
    }

    @Post(':userId')
    @ApiOperation({ summary: 'Registrar dados de bem-estar' })
    async createRecord(
        @Param('userId') userId: string,
        @Body() body: {
            sunExposureMinutes: number;
            sleepHours: number;
            energyLevel: number;
            exercised: boolean;
            notes?: string;
        },
    ) {
        return this.wellnessService.createRecord(userId, body);
    }

    @Get(':userId/summary')
    @ApiOperation({ summary: 'Obter resumo semanal de bem-estar' })
    async getWeeklySummary(@Param('userId') userId: string) {
        return this.wellnessService.getWeeklySummary(userId);
    }
}
