import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabase/client';
import {
    calculateLevelUp,
    xpRequiredForLevel,
    totalXpForLevel,
    XP_PER_TASK,
    XP_PER_ACHIEVEMENT,
} from '../utils/gamification';

// ============================================
// TYPES
// ============================================

export interface Achievement {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    iconSlug: string;
    triggerKey: string;
}

export interface UserAchievement {
    id: string;
    achievementId: string;
    unlockedAt: string;
}

export type RewardType = 'level_up' | 'achievement';

export interface PendingReward {
    type: RewardType;
    data: {
        // level_up
        newLevel?: number;
        // achievement
        achievementId?: string;
        achievementTitle?: string;
        achievementIcon?: string;
    };
}

// ============================================
// STORE INTERFACE
// ============================================

interface GamificationState {
    // Stats
    currentXP: number;
    currentLevel: number;
    totalTasksCompleted: number;

    // Achievements
    achievements: Achievement[];
    userAchievements: UserAchievement[];

    // Feedback queue
    pendingRewards: PendingReward[];

    // Loading
    isLoading: boolean;

    // Computed
    xpForCurrentLevel: number;
    xpRequiredCurrent: number;
    xpProgress: number; // 0-100

    // Actions
    fetchUserStats: (userId: string) => Promise<void>;
    fetchAchievements: () => Promise<void>;
    fetchUserAchievements: (userId: string) => Promise<void>;
    syncStats: (userId: string) => Promise<void>;

    awardXP: (amount: number, userId: string) => Promise<void>;
    onTaskComplete: (userId: string) => Promise<void>;
    checkAchievements: (userId: string) => Promise<void>;
    unlockAchievement: (achievementId: string, userId: string) => Promise<void>;

    consumeReward: () => PendingReward | null;
    setLoading: (loading: boolean) => void;
}

// ============================================
// STORE
// ============================================

export const useGamificationStore = create<GamificationState>()(
    persist(
        (set, get) => ({
            // Initial state
            currentXP: 0,
            currentLevel: 1,
            totalTasksCompleted: 0,
            achievements: [],
            userAchievements: [],
            pendingRewards: [],
            isLoading: false,
            xpForCurrentLevel: 0,
            xpRequiredCurrent: 800,
            xpProgress: 0,

            setLoading: (isLoading) => set({ isLoading }),

            // ============================================
            // FETCH FROM SUPABASE
            // ============================================

            fetchUserStats: async (userId: string) => {
                try {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('current_level, total_xp, total_tasks_completed, streak')
                        .eq('id', userId)
                        .single();

                    if (error) throw error;
                    if (!data) return;

                    const level = data.current_level ?? 1;
                    const xp = data.total_xp ?? 0;
                    const xpInLevel = xp - totalXpForLevel(level);
                    const xpReq = xpRequiredForLevel(level);

                    set({
                        currentXP: xp,
                        currentLevel: level,
                        totalTasksCompleted: data.total_tasks_completed ?? 0,
                        xpForCurrentLevel: Math.max(0, xpInLevel),
                        xpRequiredCurrent: xpReq,
                        xpProgress: xpReq > 0 ? Math.min(100, Math.round((xpInLevel / xpReq) * 100)) : 0,
                    });
                } catch (err) {
                    console.error('Error fetching user stats:', err);
                }
            },

            fetchAchievements: async () => {
                try {
                    const { data, error } = await supabase
                        .from('achievements')
                        .select('*')
                        .order('created_at');

                    if (error) throw error;

                    const achievements: Achievement[] = (data || []).map((a: any) => ({
                        id: a.id,
                        title: a.title,
                        description: a.description,
                        xpReward: a.xp_reward,
                        iconSlug: a.icon_slug,
                        triggerKey: a.trigger_key,
                    }));

                    set({ achievements });
                } catch (err) {
                    console.error('Error fetching achievements:', err);
                }
            },

            fetchUserAchievements: async (userId: string) => {
                try {
                    const { data, error } = await supabase
                        .from('user_achievements')
                        .select('*')
                        .eq('user_id', userId);

                    if (error) throw error;

                    const userAchievements: UserAchievement[] = (data || []).map((ua: any) => ({
                        id: ua.id,
                        achievementId: ua.achievement_id,
                        unlockedAt: ua.unlocked_at,
                    }));

                    set({ userAchievements });
                } catch (err) {
                    console.error('Error fetching user achievements:', err);
                }
            },

            // ============================================
            // SYNC TO SUPABASE
            // ============================================

            syncStats: async (userId: string) => {
                try {
                    const { currentXP, currentLevel, totalTasksCompleted } = get();

                    await supabase
                        .from('profiles')
                        .update({
                            total_xp: currentXP,
                            current_level: currentLevel,
                            total_tasks_completed: totalTasksCompleted,
                        })
                        .eq('id', userId);
                } catch (err) {
                    console.error('Error syncing stats:', err);
                }
            },

            // ============================================
            // XP & LEVEL UP
            // ============================================

            awardXP: async (amount: number, userId: string) => {
                const { currentXP, currentLevel } = get();
                const result = calculateLevelUp(currentXP, currentLevel, amount);

                const newState: Partial<GamificationState> = {
                    currentXP: result.newXP,
                    currentLevel: result.newLevel,
                    xpForCurrentLevel: result.xpForCurrentLevel,
                    xpRequiredCurrent: result.xpRequiredCurrent,
                    xpProgress: result.xpRequiredCurrent > 0
                        ? Math.min(100, Math.round((result.xpForCurrentLevel / result.xpRequiredCurrent) * 100))
                        : 0,
                };

                // Queue level-up rewards
                if (result.levelsGained > 0) {
                    const existingRewards = get().pendingRewards;
                    const levelRewards: PendingReward[] = [];
                    for (let i = 1; i <= result.levelsGained; i++) {
                        levelRewards.push({
                            type: 'level_up',
                            data: { newLevel: currentLevel + i },
                        });
                    }
                    newState.pendingRewards = [...existingRewards, ...levelRewards];
                }

                set(newState as any);

                // Sync to Supabase
                await get().syncStats(userId);
            },

            // ============================================
            // TASK COMPLETION
            // ============================================

            onTaskComplete: async (userId: string) => {
                const { totalTasksCompleted } = get();

                set({ totalTasksCompleted: totalTasksCompleted + 1 });

                // Award XP for task
                await get().awardXP(XP_PER_TASK, userId);

                // Check if any achievements were triggered
                await get().checkAchievements(userId);
            },

            // ============================================
            // ACHIEVEMENT CHECKING
            // ============================================

            checkAchievements: async (userId: string) => {
                const state = get();
                const unlockedIds = new Set(state.userAchievements.map((ua) => ua.achievementId));

                for (const achievement of state.achievements) {
                    if (unlockedIds.has(achievement.id)) continue;

                    let triggered = false;

                    switch (achievement.triggerKey) {
                        case 'ignicao_sistema':
                            // First task ever completed
                            triggered = state.totalTasksCompleted >= 1;
                            break;

                        case 'inquebravel': {
                            // 7-day streak — check from profiles
                            try {
                                const { data } = await supabase
                                    .from('profiles')
                                    .select('streak')
                                    .eq('id', userId)
                                    .single();
                                triggered = (data?.streak ?? 0) >= 7;
                            } catch { /* ignore */ }
                            break;
                        }

                        case 'foco_blindado': {
                            // 5 deep work tasks completed
                            try {
                                const { count } = await supabase
                                    .from('daily_tasks')
                                    .select('id', { count: 'exact', head: true })
                                    .eq('user_id', userId)
                                    .eq('completed', true)
                                    .ilike('category', '%deep%');
                                triggered = (count ?? 0) >= 5;
                            } catch { /* ignore */ }
                            break;
                        }

                        case 'engenheiro_execucao': {
                            // First monthly plan completed
                            try {
                                const { count } = await supabase
                                    .from('monthly_plans')
                                    .select('id', { count: 'exact', head: true })
                                    .eq('status', 'completed');
                                triggered = (count ?? 0) >= 1;
                            } catch { /* ignore */ }
                            break;
                        }

                        case 'exterminador_falhas': {
                            // Quiz completed (has quiz_responses)
                            try {
                                const { count } = await supabase
                                    .from('quiz_responses')
                                    .select('id', { count: 'exact', head: true })
                                    .eq('user_id', userId);
                                triggered = (count ?? 0) >= 1;
                            } catch { /* ignore */ }
                            break;
                        }

                        case 'biologia_otimizada': {
                            // 7 consecutive wellness tracking days
                            try {
                                const { count } = await supabase
                                    .from('wellness_tracking')
                                    .select('id', { count: 'exact', head: true })
                                    .eq('user_id', userId);
                                triggered = (count ?? 0) >= 7;
                            } catch { /* ignore */ }
                            break;
                        }

                        case 'dominio_alvorada': {
                            // 5 tasks completed before 06:00
                            try {
                                const { count } = await supabase
                                    .from('daily_tasks')
                                    .select('id', { count: 'exact', head: true })
                                    .eq('user_id', userId)
                                    .eq('completed', true)
                                    .lt('completed_at', '06:00:00');
                                triggered = (count ?? 0) >= 5;
                            } catch { /* ignore */ }
                            break;
                        }

                        case 'maquinario_lucro': {
                            // Any yearly goal with revenue target reached
                            try {
                                const { count } = await supabase
                                    .from('yearly_goals')
                                    .select('id', { count: 'exact', head: true })
                                    .eq('status', 'completed');
                                triggered = (count ?? 0) >= 1;
                            } catch { /* ignore */ }
                            break;
                        }

                        case 'arquetipo_sucesso':
                            // Level >= 25
                            triggered = state.currentLevel >= 25;
                            break;

                        case 'visao_5_anos': {
                            // 3 monthly plans unlocked (1st quarter planned)
                            try {
                                const { count } = await supabase
                                    .from('monthly_plans')
                                    .select('id', { count: 'exact', head: true })
                                    .in('status', ['unlocked', 'completed']);
                                triggered = (count ?? 0) >= 3;
                            } catch { /* ignore */ }
                            break;
                        }
                    }

                    if (triggered) {
                        await get().unlockAchievement(achievement.id, userId);
                    }
                }
            },

            // ============================================
            // UNLOCK ACHIEVEMENT
            // ============================================

            unlockAchievement: async (achievementId: string, userId: string) => {
                const state = get();
                const achievement = state.achievements.find((a) => a.id === achievementId);
                if (!achievement) return;

                // Check if already unlocked
                if (state.userAchievements.some((ua) => ua.achievementId === achievementId)) return;

                try {
                    // Insert into Supabase
                    const { data, error } = await supabase
                        .from('user_achievements')
                        .insert({
                            user_id: userId,
                            achievement_id: achievementId,
                            achievement_type: achievement.triggerKey,
                            title: achievement.title,
                            xp_earned: XP_PER_ACHIEVEMENT,
                        })
                        .select()
                        .single();

                    if (error) throw error;

                    // Update local state
                    const newUa: UserAchievement = {
                        id: data.id,
                        achievementId,
                        unlockedAt: data.unlocked_at,
                    };

                    set((s) => ({
                        userAchievements: [...s.userAchievements, newUa],
                        pendingRewards: [
                            ...s.pendingRewards,
                            {
                                type: 'achievement' as const,
                                data: {
                                    achievementId,
                                    achievementTitle: achievement.title,
                                    achievementIcon: achievement.iconSlug,
                                },
                            },
                        ],
                    }));

                    // Award achievement XP (this may trigger level up)
                    await get().awardXP(XP_PER_ACHIEVEMENT, userId);
                } catch (err) {
                    console.error('Error unlocking achievement:', err);
                }
            },

            // ============================================
            // CONSUME REWARD (for UI rendering)
            // ============================================

            consumeReward: () => {
                const { pendingRewards } = get();
                if (pendingRewards.length === 0) return null;

                const [reward, ...rest] = pendingRewards;
                set({ pendingRewards: rest });
                return reward;
            },
        }),
        {
            name: 'gamification-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                currentXP: state.currentXP,
                currentLevel: state.currentLevel,
                totalTasksCompleted: state.totalTasksCompleted,
                userAchievements: state.userAchievements,
            }),
        }
    )
);
