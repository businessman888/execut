import { Controller, Post, Body, Get, Param, Put, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PlanningService } from './planning.service';
import { QuizResponseDto } from './dto/quiz-response.dto';
import { GeneratedPlanDto, ExpandMonthResponseDto } from './dto/generate-plan.dto';

@ApiTags('planning')
@ApiBearerAuth()
@Controller('planning')
export class PlanningController {
    private readonly logger = new Logger(PlanningController.name);

    constructor(private readonly planningService: PlanningService) { }

    // ============================================
    // GERAÇÃO DO PLANO INICIAL
    // ============================================

    @Post('generate-plan')
    @ApiOperation({ summary: 'Gerar plano de 5 anos baseado no quiz' })
    @ApiResponse({ status: 201, description: 'Plano gerado com sucesso', type: GeneratedPlanDto })
    async generatePlan(@Body() dto: QuizResponseDto) {
        this.logger.log(`[generate-plan] Starting for user: ${dto.userId}`);
        this.logger.log(`[generate-plan] Quiz data received: ${JSON.stringify({ name: dto.name, route: dto.route })}`);

        try {
            const startTime = Date.now();
            const result = await this.planningService.generateInitialPlan(dto);
            const elapsed = Date.now() - startTime;

            this.logger.log(`[generate-plan] Success! PlanId: ${result.planId}, Time: ${elapsed}ms`);
            return result;
        } catch (error) {
            this.logger.error(`[generate-plan] Error: ${error.message}`);
            this.logger.error(`[generate-plan] Stack: ${error.stack}`);
            throw new HttpException(
                {
                    message: 'Failed to generate plan',
                    error: error.message,
                    details: process.env.NODE_ENV === 'development' ? error.stack : undefined
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // ============================================
    // OBTER PLANO COMPLETO
    // ============================================

    @Get('full-plan/:userId')
    @ApiOperation({ summary: 'Obter plano completo do usuário' })
    async getFullPlan(@Param('userId') userId: string) {
        return this.planningService.getFullPlan(userId);
    }

    // ============================================
    // TAREFAS DO DIA ATUAL
    // ============================================

    @Get('current-tasks/:userId')
    @ApiOperation({ summary: 'Obter tarefas do dia atual' })
    async getCurrentTasks(@Param('userId') userId: string) {
        return this.planningService.getCurrentDayTasks(userId);
    }

    // ============================================
    // TOGGLE TASK
    // ============================================

    @Put('tasks/:taskId/toggle')
    @ApiOperation({ summary: 'Alternar status de conclusão da tarefa' })
    async toggleTask(
        @Param('taskId') taskId: string,
        @Body('userId') userId: string,
    ) {
        return this.planningService.toggleTask(userId, taskId);
    }

    // ============================================
    // EXPANSÃO DE MÊS
    // ============================================

    @Post('expand-month/:monthId')
    @ApiOperation({ summary: 'Expandir mês com tarefas detalhadas (Just-in-Time Planning)' })
    @ApiResponse({ status: 201, description: 'Mês expandido com sucesso', type: ExpandMonthResponseDto })
    async expandMonth(
        @Param('monthId') monthId: string,
        @Body('userId') userId: string,
    ) {
        return this.planningService.expandMonth(userId, monthId);
    }

    // ============================================
    // VERIFICAR TRANSIÇÃO DE MÊS
    // ============================================

    @Get('check-transition/:userId')
    @ApiOperation({ summary: 'Verificar se deve fazer transição de mês' })
    async checkTransition(@Param('userId') userId: string) {
        return this.planningService.checkMonthTransition(userId);
    }

    // ============================================
    // WEEKLY REVIEW
    // ============================================

    @Get('weekly-review/:userId')
    @ApiOperation({ summary: 'Obter análise semanal' })
    async getWeeklyReview(@Param('userId') userId: string) {
        return this.planningService.getWeeklyReview(userId);
    }

    // ============================================
    // BACKGROUND PROCESSING - Expand remaining Year 1 months
    // ============================================

    @Post('process-year1/:userId')
    @ApiOperation({ summary: 'Processar meses restantes do Ano 1 em background' })
    @ApiResponse({ status: 200, description: 'Processamento iniciado' })
    async processRemainingYear1(@Param('userId') userId: string) {
        return this.planningService.expandRemainingYear1Months(userId);
    }

    // ============================================
    // AUTOMATIC MONTH TRANSITION
    // ============================================

    @Post('process-month-transition/:userId')
    @ApiOperation({ summary: 'Processar transição automática de mês' })
    @ApiResponse({ status: 200, description: 'Transição processada' })
    async processMonthTransition(@Param('userId') userId: string) {
        const transition = await this.planningService.checkMonthTransition(userId);

        if (transition.shouldTransition && transition.nextMonthId) {
            await this.planningService.expandMonth(userId, transition.nextMonthId);
            return { success: true, expanded: true, monthId: transition.nextMonthId };
        }

        return { success: true, expanded: false, message: 'No transition needed' };
    }

    // ============================================
    // LEGACY: SUBMIT QUIZ (mantido para compatibilidade)
    // ============================================

    @Post('quiz')
    @ApiOperation({ summary: '[DEPRECATED] Enviar respostas do quiz - use generate-plan' })
    async submitQuiz(@Body() dto: QuizResponseDto) {
        return this.planningService.generateInitialPlan(dto);
    }
}
