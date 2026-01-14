import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateDailyTaskDto } from './dto/create-daily-task.dto';

@Injectable()
export class GoalsService {
    constructor(private readonly supabase: SupabaseService) { }

    async getDailyTasks(userId: string, date?: string) {
        const targetDate = date || new Date().toISOString().split('T')[0];

        const { data, error } = await this.supabase.admin
            .from('daily_tasks')
            .select('*')
            .eq('user_id', userId)
            .eq('scheduled_date', targetDate)
            .order('created_at', { ascending: true });

        if (error) throw new Error(error.message);
        return data || [];
    }

    async createDailyTask(dto: CreateDailyTaskDto) {
        const { data, error } = await this.supabase.admin
            .from('daily_tasks')
            .insert({
                user_id: dto.userId,
                weekly_plan_id: dto.weeklyPlanId,
                title: dto.title,
                description: dto.description,
                scheduled_date: dto.scheduledDate,
                xp_reward: dto.xpReward || 10,
                day_of_week: new Date(dto.scheduledDate).getDay() || 7,
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async toggleTask(taskId: string) {
        // Get current task
        const { data: task, error: getError } = await this.supabase.admin
            .from('daily_tasks')
            .select('*')
            .eq('id', taskId)
            .single();

        if (getError || !task) {
            throw new NotFoundException('Tarefa não encontrada');
        }

        // Toggle completion
        const { data, error } = await this.supabase.admin
            .from('daily_tasks')
            .update({
                completed: !task.completed,
                completed_at: !task.completed ? new Date().toISOString() : null,
            })
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async getWeeklyPlans(userId: string) {
        const { data, error } = await this.supabase.admin
            .from('weekly_plans')
            .select(`
        *,
        daily_tasks (*)
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        return data || [];
    }

    async getMonthlyGoals(userId: string) {
        const { data, error } = await this.supabase.admin
            .from('monthly_goals')
            .select(`
        *,
        weekly_plans (*)
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        return data || [];
    }

    async getFiveYearPlan(userId: string) {
        const { data, error } = await this.supabase.admin
            .from('five_year_plans')
            .select(`
        *,
        yearly_goals (*)
      `)
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw new Error(error.message);
        }
        return data;
    }
}
