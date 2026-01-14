import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';

@Injectable()
export class GamificationService {
    constructor(private readonly supabase: SupabaseService) { }

    /**
     * Calculate level from total XP
     * Formula: Level = floor(sqrt(totalXP / 100)) + 1
     */
    calculateLevel(totalXP: number): number {
        return Math.floor(Math.sqrt(totalXP / 100)) + 1;
    }

    /**
     * Get XP required for next level
     */
    getXPForNextLevel(currentLevel: number): number {
        return Math.pow(currentLevel, 2) * 100;
    }

    async getXPAndLevel(userId: string) {
        const { data: profile } = await this.supabase.admin
            .from('profiles')
            .select('total_xp, current_level')
            .eq('id', userId)
            .single();

        if (!profile) return null;

        const currentLevel = this.calculateLevel(profile.total_xp);
        const xpForNextLevel = this.getXPForNextLevel(currentLevel);
        const xpProgress = profile.total_xp - this.getXPForNextLevel(currentLevel - 1);

        return {
            totalXP: profile.total_xp,
            currentLevel,
            xpForNextLevel,
            xpProgress,
            progressPercent: Math.round((xpProgress / (xpForNextLevel - this.getXPForNextLevel(currentLevel - 1))) * 100),
        };
    }

    async awardXP(userId: string, amount: number, reason?: string) {
        // Get current XP
        const { data: profile } = await this.supabase.admin
            .from('profiles')
            .select('total_xp, current_level')
            .eq('id', userId)
            .single();

        if (!profile) throw new Error('User not found');

        const newTotalXP = profile.total_xp + amount;
        const oldLevel = profile.current_level;
        const newLevel = this.calculateLevel(newTotalXP);

        // Update profile
        await this.supabase.admin
            .from('profiles')
            .update({
                total_xp: newTotalXP,
                current_level: newLevel,
            })
            .eq('id', userId);

        const leveledUp = newLevel > oldLevel;

        return {
            xpAwarded: amount,
            newTotalXP,
            leveledUp,
            newLevel: leveledUp ? newLevel : null,
            reason,
        };
    }

    async getAchievements(userId: string) {
        const { data } = await this.supabase.admin
            .from('user_achievements')
            .select('*')
            .eq('user_id', userId)
            .order('unlocked_at', { ascending: false });

        return data || [];
    }

    async unlockAchievement(userId: string, achievementType: string, title: string, xpReward: number) {
        // Check if already unlocked
        const { data: existing } = await this.supabase.admin
            .from('user_achievements')
            .select('id')
            .eq('user_id', userId)
            .eq('achievement_type', achievementType)
            .single();

        if (existing) return null; // Already unlocked

        // Insert achievement
        const { data } = await this.supabase.admin
            .from('user_achievements')
            .insert({
                user_id: userId,
                achievement_type: achievementType,
                title,
                xp_earned: xpReward,
                unlocked_at: new Date().toISOString(),
            })
            .select()
            .single();

        // Award XP
        await this.awardXP(userId, xpReward, `Achievement: ${title}`);

        return data;
    }

    async getStreak(userId: string) {
        // Get last 30 days of completed tasks
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: tasks } = await this.supabase.admin
            .from('daily_tasks')
            .select('scheduled_date, completed')
            .eq('user_id', userId)
            .eq('completed', true)
            .gte('scheduled_date', thirtyDaysAgo.toISOString().split('T')[0])
            .order('scheduled_date', { ascending: false });

        if (!tasks || tasks.length === 0) {
            return { currentStreak: 0, bestStreak: 0 };
        }

        // Calculate current streak
        const uniqueDays = [...new Set(tasks.map(t => t.scheduled_date))].sort().reverse();
        let currentStreak = 0;
        const today = new Date().toISOString().split('T')[0];

        for (let i = 0; i < uniqueDays.length; i++) {
            const expectedDate = new Date();
            expectedDate.setDate(expectedDate.getDate() - i);
            const expected = expectedDate.toISOString().split('T')[0];

            if (uniqueDays.includes(expected)) {
                currentStreak++;
            } else {
                break;
            }
        }

        return {
            currentStreak,
            bestStreak: currentStreak, // TODO: Track best streak separately
        };
    }
}
