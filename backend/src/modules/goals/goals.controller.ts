import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GoalsService } from './goals.service';
import { CreateDailyTaskDto } from './dto/create-daily-task.dto';

@ApiTags('goals')
@ApiBearerAuth()
@Controller('goals')
export class GoalsController {
    constructor(private readonly goalsService: GoalsService) { }

    @Get('daily-tasks/:userId')
    @ApiOperation({ summary: 'Obter tarefas diárias' })
    async getDailyTasks(
        @Param('userId') userId: string,
        @Query('date') date?: string,
    ) {
        return this.goalsService.getDailyTasks(userId, date);
    }

    @Post('daily-tasks')
    @ApiOperation({ summary: 'Criar tarefa diária' })
    async createDailyTask(@Body() dto: CreateDailyTaskDto) {
        return this.goalsService.createDailyTask(dto);
    }

    @Put('daily-tasks/:id/toggle')
    @ApiOperation({ summary: 'Marcar/desmarcar tarefa como completa' })
    async toggleTask(@Param('id') id: string) {
        return this.goalsService.toggleTask(id);
    }

    @Get('weekly-plans/:userId')
    @ApiOperation({ summary: 'Obter planos semanais' })
    async getWeeklyPlans(@Param('userId') userId: string) {
        return this.goalsService.getWeeklyPlans(userId);
    }

    @Get('monthly-goals/:userId')
    @ApiOperation({ summary: 'Obter metas mensais' })
    async getMonthlyGoals(@Param('userId') userId: string) {
        return this.goalsService.getMonthlyGoals(userId);
    }

    @Get('five-year-plan/:userId')
    @ApiOperation({ summary: 'Obter plano de 5 anos' })
    async getFiveYearPlan(@Param('userId') userId: string) {
        return this.goalsService.getFiveYearPlan(userId);
    }
}
