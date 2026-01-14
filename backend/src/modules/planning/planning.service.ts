import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { QuizResponseDto } from './dto/quiz-response.dto';

@Injectable()
export class PlanningService {
    constructor(private readonly supabase: SupabaseService) { }

    async generatePlanFromQuiz(dto: QuizResponseDto) {
        // TODO: Integrate with AI Agent to generate plan
        // For now, save quiz responses and create basic structure

        const { data: plan, error } = await this.supabase.admin
            .from('five_year_plans')
            .insert({
                user_id: dto.userId,
                title: 'Meu Plano de 5 Anos',
                vision_statement: `Em 5 anos, alcançar R$ ${dto.financialGoal5Years}/mês`,
                status: 'active',
            })
            .select()
            .single();

        if (error) throw new Error(error.message);

        // Save quiz responses
        await this.supabase.admin.from('quiz_responses').insert({
            user_id: dto.userId,
            plan_id: plan.id,
            responses: dto,
        });

        return {
            plan,
            message: 'Plano de 5 anos criado com sucesso. IA irá gerar detalhes.',
        };
    }

    async generateNextWeek(userId: string) {
        // TODO: Integrate with AI Agent
        return {
            message: 'Próxima semana será gerada pela IA',
            userId,
        };
    }

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
}
