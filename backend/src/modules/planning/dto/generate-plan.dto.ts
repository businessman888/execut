import { ApiProperty } from '@nestjs/swagger';

// ============================================
// GENERATED PLAN STRUCTURE
// ============================================

export class YearlyGoalDto {
    @ApiProperty({ example: 1 })
    year: number;

    @ApiProperty({ example: 'IMPLANTAÇÃO' })
    phase: string;

    @ApiProperty({ example: 'Consolidação Digital' })
    goal: string;

    @ApiProperty({ example: 10000 })
    revenue_target: number;
}

export class DailyTaskPlanDto {
    @ApiProperty({ example: 'Definir persona ideal' })
    title: string;

    @ApiProperty({ example: 'Mapear dores e necessidades do público-alvo' })
    description: string;

    @ApiProperty({ example: 'Estratégia' })
    category: string;

    @ApiProperty({ example: 25 })
    xp_reward: number;
}

export class DayPlanDto {
    @ApiProperty({ example: 1 })
    day: number;

    @ApiProperty({ example: 'Seg' })
    day_name: string;

    @ApiProperty({ type: [DailyTaskPlanDto] })
    tasks: DailyTaskPlanDto[];
}

export class WeekPlanDto {
    @ApiProperty({ example: 1 })
    week_number: number;

    @ApiProperty({ example: '01-07' })
    date_range: string;

    @ApiProperty({ example: 'Definição de Persona' })
    title: string;

    @ApiProperty({ example: 'Mapeamento de dores e necessidades' })
    description: string;

    @ApiProperty({ type: [DayPlanDto] })
    daily_tasks: DayPlanDto[];
}

export class MonthDetailDto {
    @ApiProperty({ example: 'Validação de Mercado' })
    focus: string;

    @ApiProperty({ type: [WeekPlanDto] })
    weeks: WeekPlanDto[];
}

export class MonthlyRoadmapDto {
    @ApiProperty({ example: 1 })
    month: number;

    @ApiProperty({ example: 'Fevereiro' })
    month_name: string;

    @ApiProperty({ example: 'Validação de Mercado' })
    objective_title: string;

    @ApiProperty({ example: 'Validar hipóteses com early adopters' })
    objective_description: string;

    @ApiProperty({ enum: ['unlocked', 'locked'], example: 'locked' })
    status: 'unlocked' | 'locked';
}

export class GeneratedPlanDto {
    @ApiProperty({ example: 'Em 5 anos, você será um empreendedor digital de sucesso...' })
    vision_statement: string;

    @ApiProperty({ type: [YearlyGoalDto] })
    vision_5_years: YearlyGoalDto[];

    @ApiProperty({ type: [MonthlyRoadmapDto] })
    year_01_roadmap: MonthlyRoadmapDto[];

    @ApiProperty({ type: MonthDetailDto })
    month_01_detail: MonthDetailDto;
}

// ============================================
// EXPAND MONTH REQUEST/RESPONSE
// ============================================

export class ExpandMonthRequestDto {
    @ApiProperty({ description: 'ID do plano de 5 anos' })
    planId: string;

    @ApiProperty({ description: 'ID do mês a ser expandido' })
    monthId: string;

    @ApiProperty({ description: 'Progresso do mês anterior (0-100)' })
    previousMonthProgress: number;

    @ApiProperty({ description: 'Tarefas completadas no mês anterior' })
    previousMonthTasksCompleted: number;

    @ApiProperty({ description: 'Total de tarefas no mês anterior' })
    previousMonthTasksTotal: number;
}

export class ExpandMonthResponseDto {
    @ApiProperty({ type: MonthDetailDto })
    month_detail: MonthDetailDto;

    @ApiProperty({ example: true })
    success: boolean;
}
