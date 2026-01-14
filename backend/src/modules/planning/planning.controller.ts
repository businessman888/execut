import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PlanningService } from './planning.service';
import { QuizResponseDto } from './dto/quiz-response.dto';

@ApiTags('planning')
@ApiBearerAuth()
@Controller('planning')
export class PlanningController {
    constructor(private readonly planningService: PlanningService) { }

    @Post('quiz')
    @ApiOperation({ summary: 'Enviar respostas do quiz e gerar plano' })
    async submitQuiz(@Body() dto: QuizResponseDto) {
        return this.planningService.generatePlanFromQuiz(dto);
    }

    @Post('generate-next-week/:userId')
    @ApiOperation({ summary: 'Gerar próxima semana automaticamente' })
    async generateNextWeek(@Param('userId') userId: string) {
        return this.planningService.generateNextWeek(userId);
    }

    @Get('weekly-review/:userId')
    @ApiOperation({ summary: 'Obter análise semanal' })
    async getWeeklyReview(@Param('userId') userId: string) {
        return this.planningService.getWeeklyReview(userId);
    }
}
