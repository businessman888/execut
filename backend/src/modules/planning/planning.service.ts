import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { AIAgentService } from '../ai-agent/ai-agent.service';
import { QuizResponseDto } from './dto/quiz-response.dto';
import { GeneratedPlanDto, ExpandMonthRequestDto, ExpandMonthResponseDto } from './dto/generate-plan.dto';

@Injectable()
export class PlanningService {
    private readonly logger = new Logger(PlanningService.name);

    constructor(
        private readonly supabase: SupabaseService,
        private readonly aiAgent: AIAgentService,
    ) { }

    // ============================================
    // GERAÇÃO DO PLANO INICIAL
    // ============================================

    async generateInitialPlan(dto: QuizResponseDto): Promise<{ plan: GeneratedPlanDto; planId: string }> {
        this.logger.log(`Generating initial plan for user ${dto.userId}`);

        // 1. Chamar IA para gerar plano completo
        const generatedPlan = await this.aiAgent.generateFiveYearPlanFromQuiz(dto);

        // 2. Persistir no banco de dados
        const planId = await this.persistPlan(dto.userId, dto, generatedPlan);

        this.logger.log(`Plan ${planId} created successfully for user ${dto.userId}`);

        return {
            plan: generatedPlan,
            planId,
        };
    }

    // ============================================
    // OBTER PLANO COMPLETO
    // ============================================

    async getFullPlan(userId: string) {
        // Buscar plano ativo do usuário
        const { data: plan, error: planError } = await this.supabase.admin
            .from('five_year_plans')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .single();

        if (planError || !plan) {
            throw new NotFoundException('No active plan found for user');
        }

        // Buscar yearly goals
        const { data: yearlyGoals } = await this.supabase.admin
            .from('yearly_goals')
            .select('*')
            .eq('plan_id', plan.id)
            .order('year_number', { ascending: true });

        // Buscar monthly plans do ano ativo
        const activeYear = yearlyGoals?.find(y => y.is_active);
        let monthlyPlans = [];
        if (activeYear) {
            const { data: months } = await this.supabase.admin
                .from('monthly_plans')
                .select('*')
                .eq('yearly_goal_id', activeYear.id)
                .order('month_number', { ascending: true });
            monthlyPlans = months || [];
        }

        // Buscar weekly/daily plans do mês ativo
        const activeMonth = monthlyPlans.find(m => m.status === 'unlocked' || m.status === 'completed');
        let weeklyPlans = [];
        if (activeMonth) {
            const { data: weeks } = await this.supabase.admin
                .from('weekly_plans')
                .select(`
                    *,
                    daily_tasks(*)
                `)
                .eq('monthly_plan_id', activeMonth.id)
                .order('week_number', { ascending: true });
            weeklyPlans = weeks || [];
        }

        return {
            plan,
            yearlyGoals: yearlyGoals || [],
            monthlyPlans,
            weeklyPlans,
        };
    }

    // ============================================
    // OBTER TAREFAS DO DIA ATUAL
    // ============================================

    async getCurrentDayTasks(userId: string) {
        const today = new Date().toISOString().split('T')[0];

        const { data: tasks, error } = await this.supabase.admin
            .from('daily_tasks')
            .select('*')
            .eq('user_id', userId)
            .eq('scheduled_date', today)
            .order('created_at', { ascending: true });

        if (error) {
            this.logger.error('Error fetching current day tasks:', error);
            throw new Error(error.message);
        }

        return tasks || [];
    }

    // ============================================
    // EXPANSÃO DE MÊS (Just-in-Time Planning)
    // ============================================

    async expandMonth(userId: string, monthId: string): Promise<ExpandMonthResponseDto> {
        this.logger.log(`Expanding month ${monthId} for user ${userId}`);

        // 1. Buscar dados do mês
        const { data: month, error: monthError } = await this.supabase.admin
            .from('monthly_plans')
            .select('*')
            .eq('id', monthId)
            .single();

        if (monthError || !month) {
            throw new NotFoundException('Month not found');
        }

        // 2. Verificar se mês já está expandido
        const { data: existingWeeks } = await this.supabase.admin
            .from('weekly_plans')
            .select('id')
            .eq('monthly_plan_id', monthId);

        if (existingWeeks && existingWeeks.length > 0) {
            return { success: true, month_detail: { focus: month.objective_title, weeks: [] } };
        }

        // 3. Buscar progresso do mês anterior
        const previousProgress = await this.getPreviousMonthProgress(month.yearly_goal_id, month.month_number);

        // 4. Chamar IA para expandir mês
        const request: ExpandMonthRequestDto = {
            planId: '',
            monthId,
            previousMonthProgress: previousProgress.progress,
            previousMonthTasksCompleted: previousProgress.completed,
            previousMonthTasksTotal: previousProgress.total,
        };

        const monthDetail = await this.aiAgent.expandMonth(request, month.objective_title);

        // 5. Persistir semanas e tarefas
        await this.persistMonthDetail(userId, monthId, monthDetail);

        // 6. Atualizar status do mês para unlocked
        await this.supabase.admin
            .from('monthly_plans')
            .update({ status: 'unlocked', unlocked_at: new Date().toISOString() })
            .eq('id', monthId);

        this.logger.log(`Month ${monthId} expanded successfully`);

        return {
            success: true,
            month_detail: monthDetail,
        };
    }

    // ============================================
    // VERIFICAR TRANSIÇÃO DE MÊS
    // ============================================

    async checkMonthTransition(userId: string): Promise<{ shouldTransition: boolean; nextMonthId?: string }> {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        if (today.getDate() !== lastDayOfMonth) {
            return { shouldTransition: false };
        }

        // Buscar próximo mês bloqueado
        const fullPlan = await this.getFullPlan(userId);
        const nextLockedMonth = fullPlan.monthlyPlans.find(m => m.status === 'locked');

        if (!nextLockedMonth) {
            return { shouldTransition: false };
        }

        return {
            shouldTransition: true,
            nextMonthId: nextLockedMonth.id,
        };
    }

    // ============================================
    // TOGGLE TASK
    // ============================================

    async toggleTask(userId: string, taskId: string) {
        const { data: task, error: fetchError } = await this.supabase.admin
            .from('daily_tasks')
            .select('*')
            .eq('id', taskId)
            .eq('user_id', userId)
            .single();

        if (fetchError || !task) {
            throw new NotFoundException('Task not found');
        }

        const { data: updated, error: updateError } = await this.supabase.admin
            .from('daily_tasks')
            .update({
                completed: !task.completed,
                completed_at: !task.completed ? new Date().toISOString() : null,
            })
            .eq('id', taskId)
            .select()
            .single();

        if (updateError) {
            throw new Error(updateError.message);
        }

        return updated;
    }

    // ============================================
    // WEEKLY REVIEW
    // ============================================

    async getWeeklyReview(userId: string) {
        const { data, error } = await this.supabase.admin
            .from('weekly_reviews')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw new Error(error.message);
        }

        return data;
    }

    // ============================================
    // EXPAND REMAINING YEAR 1 MONTHS (Background Processing)
    // ============================================

    async expandRemainingYear1Months(userId: string): Promise<{ success: boolean; expandedMonths: string[] }> {
        this.logger.log(`Starting background expansion of Year 1 months for user ${userId}`);

        try {
            const fullPlan = await this.getFullPlan(userId);
            const lockedMonths = fullPlan.monthlyPlans.filter(m => m.status === 'locked');
            const expandedMonths: string[] = [];

            // Process months sequentially (months 2-12)
            for (const month of lockedMonths) {
                try {
                    await this.expandMonth(userId, month.id);
                    expandedMonths.push(month.id);
                    this.logger.log(`Expanded month ${month.month_number} for user ${userId}`);
                } catch (error) {
                    this.logger.error(`Error expanding month ${month.month_number}:`, error);
                    // Continue with next month even if one fails
                }
            }

            this.logger.log(`Completed background expansion: ${expandedMonths.length} months expanded`);
            return { success: true, expandedMonths };
        } catch (error) {
            this.logger.error('Error in background month expansion:', error);
            return { success: false, expandedMonths: [] };
        }
    }

    // ============================================
    // MÉTODOS PRIVADOS DE PERSISTÊNCIA
    // ============================================

    private async persistPlan(userId: string, quiz: QuizResponseDto, plan: GeneratedPlanDto): Promise<string> {
        // 1. Criar five_year_plan
        const { data: fiveYearPlan, error: planError } = await this.supabase.admin
            .from('five_year_plans')
            .insert({
                user_id: userId,
                vision_statement: plan.vision_statement,
                financial_goal_5y: plan.vision_5_years[4]?.revenue_target || 50000,
                quiz_responses: quiz,
                status: 'active',
            })
            .select()
            .single();

        if (planError) {
            this.logger.error('Error creating five_year_plan:', planError);
            throw new Error(planError.message);
        }

        // 2. Criar yearly_goals (5 anos)
        const yearlyGoalsData = plan.vision_5_years.map((year, index) => ({
            plan_id: fiveYearPlan.id,
            year_number: year.year,
            phase: year.phase,
            title: year.goal,
            revenue_target: year.revenue_target,
            is_active: index === 0, // Apenas ano 1 ativo
        }));

        const { data: yearlyGoals, error: yearlyError } = await this.supabase.admin
            .from('yearly_goals')
            .insert(yearlyGoalsData)
            .select();

        if (yearlyError) {
            this.logger.error('Error creating yearly_goals:', yearlyError);
            throw new Error(yearlyError.message);
        }

        // 3. Criar monthly_plans (12 meses para ano 1)
        const year1Goal = yearlyGoals.find(y => y.year_number === 1);
        const monthlyPlansData = plan.year_01_roadmap.map(month => ({
            yearly_goal_id: year1Goal.id,
            month_number: month.month,
            objective_title: month.objective_title,
            objective_description: month.objective_description,
            status: month.status,
            unlocked_at: month.status === 'unlocked' ? new Date().toISOString() : null,
        }));

        const { data: monthlyPlans, error: monthlyError } = await this.supabase.admin
            .from('monthly_plans')
            .insert(monthlyPlansData)
            .select();

        if (monthlyError) {
            this.logger.error('Error creating monthly_plans:', monthlyError);
            throw new Error(monthlyError.message);
        }

        // 4. Criar weekly_plans e daily_tasks para mês 1
        const month1Plan = monthlyPlans.find(m => m.month_number === 1);
        await this.persistMonthDetail(userId, month1Plan.id, plan.month_01_detail);

        return fiveYearPlan.id;
    }

    private async persistMonthDetail(userId: string, monthId: string, monthDetail: any): Promise<void> {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // 0-indexed

        for (const week of monthDetail.weeks) {
            // Criar weekly_plan
            const { data: weeklyPlan, error: weekError } = await this.supabase.admin
                .from('weekly_plans')
                .insert({
                    monthly_plan_id: monthId,
                    week_number: week.week_number,
                    date_range: week.date_range,
                    title: week.title,
                    description: week.description,
                    status: week.week_number === 1 ? 'current' : 'pending',
                })
                .select()
                .single();

            if (weekError) {
                this.logger.error('Error creating weekly_plan:', weekError);
                continue;
            }

            // Criar daily_tasks
            for (const dayPlan of week.daily_tasks) {
                const scheduledDate = new Date(currentYear, currentMonth, dayPlan.day);

                for (const task of dayPlan.tasks) {
                    await this.supabase.admin
                        .from('daily_tasks')
                        .insert({
                            weekly_plan_id: weeklyPlan.id,
                            user_id: userId,
                            scheduled_date: scheduledDate.toISOString().split('T')[0],
                            title: task.title,
                            description: task.description,
                            category: task.category,
                            xp_reward: task.xp_reward,
                            completed: false,
                        });
                }
            }
        }
    }

    private async getPreviousMonthProgress(yearlyGoalId: string, currentMonthNumber: number) {
        if (currentMonthNumber === 1) {
            return { progress: 0, completed: 0, total: 0 };
        }

        // Buscar mês anterior
        const { data: prevMonth } = await this.supabase.admin
            .from('monthly_plans')
            .select('id, progress')
            .eq('yearly_goal_id', yearlyGoalId)
            .eq('month_number', currentMonthNumber - 1)
            .single();

        if (!prevMonth) {
            return { progress: 0, completed: 0, total: 0 };
        }

        // Contar tarefas do mês anterior
        const { data: weeks } = await this.supabase.admin
            .from('weekly_plans')
            .select('id')
            .eq('monthly_plan_id', prevMonth.id);

        if (!weeks || weeks.length === 0) {
            return { progress: prevMonth.progress || 0, completed: 0, total: 0 };
        }

        const weekIds = weeks.map(w => w.id);
        const { data: tasks, count } = await this.supabase.admin
            .from('daily_tasks')
            .select('completed', { count: 'exact' })
            .in('weekly_plan_id', weekIds);

        const completed = tasks?.filter(t => t.completed).length || 0;

        return {
            progress: prevMonth.progress || 0,
            completed,
            total: count || 0,
        };
    }
}
