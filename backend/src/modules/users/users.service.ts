import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
    constructor(private readonly supabase: SupabaseService) { }

    async getProfile(userId: string) {
        const { data, error } = await this.supabase.admin
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error || !data) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return data;
    }

    async updateProfile(userId: string, dto: UpdateProfileDto) {
        const { data, error } = await this.supabase.admin
            .from('profiles')
            .update({
                full_name: dto.fullName,
                username: dto.username,
                bio: dto.bio,
                avatar_url: dto.avatarUrl,
                is_public: dto.isPublic,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async getStats(userId: string) {
        // Get profile
        const profile = await this.getProfile(userId);

        // Get tasks completed count
        const { count: tasksCompleted } = await this.supabase.admin
            .from('daily_tasks')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('completed', true);

        // Get achievements count
        const { count: achievementsCount } = await this.supabase.admin
            .from('user_achievements')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        return {
            currentLevel: profile.current_level,
            totalXp: profile.total_xp,
            tasksCompleted: tasksCompleted || 0,
            achievementsCount: achievementsCount || 0,
            streakDays: 0, // TODO: Calculate streak
        };
    }
}
