import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    FiveYearPlan,
    YearlyGoal,
    MonthlyPlan,
    WeeklyPlan,
    DailyTask,
    GeneratedPlan,
} from '../types/planning';

// ============================================
// INTERFACE DO STORE
// ============================================

interface GoalsState {
    // Dados do plano
    fiveYearPlan: FiveYearPlan | null;
    yearlyGoals: YearlyGoal[];
    monthlyPlans: MonthlyPlan[];
    weeklyPlans: WeeklyPlan[];
    dailyTasks: DailyTask[];

    // Estado atual
    currentYearNumber: number;
    currentMonthNumber: number;
    currentWeekNumber: number;
    currentDayTasks: DailyTask[];

    // Estado de carregamento
    isLoading: boolean;
    isPlanGenerated: boolean;
    error: string | null;

    // Actions - Setters
    setFiveYearPlan: (plan: FiveYearPlan) => void;
    setYearlyGoals: (goals: YearlyGoal[]) => void;
    setMonthlyPlans: (plans: MonthlyPlan[]) => void;
    setWeeklyPlans: (plans: WeeklyPlan[]) => void;
    setDailyTasks: (tasks: DailyTask[]) => void;
    setCurrentDayTasks: (tasks: DailyTask[]) => void;

    // Actions - Plan Management
    initializePlanFromApi: (data: {
        plan: FiveYearPlan;
        yearlyGoals: YearlyGoal[];
        monthlyPlans: MonthlyPlan[];
        weeklyPlans: WeeklyPlan[];
    }) => void;
    setGeneratedPlan: (planId: string, plan: GeneratedPlan) => void;

    // Actions - Task Management
    toggleTask: (taskId: string) => void;
    completeTask: (taskId: string) => void;

    // Actions - Navigation
    setCurrentYear: (yearNumber: number) => void;
    setCurrentMonth: (monthNumber: number) => void;
    setCurrentWeek: (weekNumber: number) => void;

    // Actions - Helpers
    getActiveYear: () => YearlyGoal | null;
    getActiveMonth: () => MonthlyPlan | null;
    getCurrentWeekPlan: () => WeeklyPlan | null;
    getMonthlyPlansForYear: (yearNumber: number) => MonthlyPlan[];
    getWeeklyPlansForMonth: (monthId: string) => WeeklyPlan[];
    getTasksForWeek: (weekId: string) => DailyTask[];
    getTasksForDate: (date: string) => DailyTask[];

    // Actions - State
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

// ============================================
// ESTADO INICIAL
// ============================================

const initialState = {
    fiveYearPlan: null,
    yearlyGoals: [],
    monthlyPlans: [],
    weeklyPlans: [],
    dailyTasks: [],
    currentYearNumber: 1,
    currentMonthNumber: 1,
    currentWeekNumber: 1,
    currentDayTasks: [],
    isLoading: false,
    isPlanGenerated: false,
    error: null,
};

// ============================================
// STORE COM PERSISTÊNCIA
// ============================================

export const useGoalsStore = create<GoalsState>()(
    persist(
        (set, get) => ({
            ...initialState,

            // === SETTERS BÁSICOS ===

            setFiveYearPlan: (plan) => set({ fiveYearPlan: plan, isPlanGenerated: true }),

            setYearlyGoals: (goals) => set({ yearlyGoals: goals }),

            setMonthlyPlans: (plans) => set({ monthlyPlans: plans }),

            setWeeklyPlans: (plans) => set({ weeklyPlans: plans }),

            setDailyTasks: (tasks) => set({ dailyTasks: tasks }),

            setCurrentDayTasks: (tasks) => set({ currentDayTasks: tasks }),

            // === INICIALIZAÇÃO DO PLANO ===

            initializePlanFromApi: (data) =>
                set({
                    fiveYearPlan: data.plan,
                    yearlyGoals: data.yearlyGoals,
                    monthlyPlans: data.monthlyPlans,
                    weeklyPlans: data.weeklyPlans.map((wp) => ({
                        ...wp,
                        dailyTasks: (wp as any).daily_tasks || [],
                    })),
                    dailyTasks: data.weeklyPlans.flatMap((wp) => (wp as any).daily_tasks || []),
                    isPlanGenerated: true,
                }),

            setGeneratedPlan: (planId, plan) => {
                // Criar estrutura hierárquica a partir do plano gerado pela IA
                const yearlyGoals: YearlyGoal[] = plan.vision_5_years.map((year, index) => ({
                    id: `temp-year-${year.year}`,
                    planId,
                    yearNumber: year.year,
                    phase: year.phase,
                    title: year.goal,
                    revenueTarget: year.revenue_target,
                    isActive: index === 0,
                    createdAt: new Date().toISOString(),
                }));

                const monthlyPlans: MonthlyPlan[] = plan.year_01_roadmap.map((month) => ({
                    id: `temp-month-${month.month}`,
                    yearlyGoalId: yearlyGoals[0].id,
                    monthNumber: month.month,
                    objectiveTitle: month.objective_title,
                    objectiveDescription: month.objective_description,
                    status: month.status,
                    progress: 0,
                    unlockedAt: month.status === 'unlocked' ? new Date().toISOString() : null,
                    createdAt: new Date().toISOString(),
                    keyObjectives: month.key_objectives || [],
                }));

                const weeklyPlans: WeeklyPlan[] = plan.month_01_detail.weeks.map((week) => ({
                    id: `temp-week-${week.week_number}`,
                    monthlyPlanId: monthlyPlans[0].id,
                    weekNumber: week.week_number,
                    dateRange: week.date_range,
                    title: week.title,
                    description: week.description,
                    status: week.week_number === 1 ? 'current' : 'pending',
                    progress: 0,
                    createdAt: new Date().toISOString(),
                }));

                const dailyTasks: DailyTask[] = plan.month_01_detail.weeks.flatMap((week) =>
                    week.daily_tasks.flatMap((dayPlan) =>
                        dayPlan.tasks.map((task, taskIndex) => ({
                            id: `temp-task-${week.week_number}-${dayPlan.day}-${taskIndex}`,
                            weeklyPlanId: `temp-week-${week.week_number}`,
                            userId: '',
                            scheduledDate: getDateForDay(dayPlan.day),
                            title: task.title,
                            description: task.description,
                            category: task.category,
                            xpReward: task.xp_reward,
                            completed: false,
                            completedAt: null,
                            createdAt: new Date().toISOString(),
                        }))
                    )
                );

                // Tarefas de hoje
                const today = new Date().toISOString().split('T')[0];
                const todayTasks = dailyTasks.filter((t) => t.scheduledDate === today);

                set({
                    fiveYearPlan: {
                        id: planId,
                        userId: '',
                        visionStatement: plan.vision_statement,
                        financialGoal5Y: plan.vision_5_years[4]?.revenue_target || 0,
                        quizResponses: {},
                        status: 'active',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    yearlyGoals,
                    monthlyPlans,
                    weeklyPlans,
                    dailyTasks,
                    currentDayTasks: todayTasks,
                    isPlanGenerated: true,
                });
            },

            // === TASK MANAGEMENT ===

            toggleTask: (taskId) =>
                set((state) => {
                    const updatedTasks = state.dailyTasks.map((task) =>
                        task.id === taskId
                            ? {
                                ...task,
                                completed: !task.completed,
                                completedAt: !task.completed ? new Date().toISOString() : null,
                            }
                            : task
                    );

                    const updatedCurrentDay = state.currentDayTasks.map((task) =>
                        task.id === taskId
                            ? {
                                ...task,
                                completed: !task.completed,
                                completedAt: !task.completed ? new Date().toISOString() : null,
                            }
                            : task
                    );

                    return {
                        dailyTasks: updatedTasks,
                        currentDayTasks: updatedCurrentDay,
                    };
                }),

            completeTask: (taskId) =>
                set((state) => ({
                    dailyTasks: state.dailyTasks.map((task) =>
                        task.id === taskId
                            ? { ...task, completed: true, completedAt: new Date().toISOString() }
                            : task
                    ),
                    currentDayTasks: state.currentDayTasks.map((task) =>
                        task.id === taskId
                            ? { ...task, completed: true, completedAt: new Date().toISOString() }
                            : task
                    ),
                })),

            // === NAVIGATION ===

            setCurrentYear: (yearNumber) => set({ currentYearNumber: yearNumber }),

            setCurrentMonth: (monthNumber) => set({ currentMonthNumber: monthNumber }),

            setCurrentWeek: (weekNumber) => set({ currentWeekNumber: weekNumber }),

            // === HELPERS ===

            getActiveYear: () => {
                const state = get();
                return state.yearlyGoals.find((y) => y.isActive) || null;
            },

            getActiveMonth: () => {
                const state = get();
                return (
                    state.monthlyPlans.find((m) => m.status === 'unlocked') ||
                    state.monthlyPlans.find((m) => m.status === 'completed') ||
                    null
                );
            },

            getCurrentWeekPlan: () => {
                const state = get();
                return state.weeklyPlans.find((w) => w.status === 'current') || null;
            },

            getMonthlyPlansForYear: (yearNumber) => {
                const state = get();
                const yearGoal = state.yearlyGoals.find((y) => y.yearNumber === yearNumber);
                if (!yearGoal) return [];
                return state.monthlyPlans.filter((m) => m.yearlyGoalId === yearGoal.id);
            },

            getWeeklyPlansForMonth: (monthId) => {
                const state = get();
                return state.weeklyPlans.filter((w) => w.monthlyPlanId === monthId);
            },

            getTasksForWeek: (weekId) => {
                const state = get();
                return state.dailyTasks.filter((t) => t.weeklyPlanId === weekId);
            },

            getTasksForDate: (date) => {
                const state = get();
                return state.dailyTasks.filter((t) => t.scheduledDate === date);
            },

            // === STATE MANAGEMENT ===

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            reset: () => set(initialState),
        }),
        {
            name: 'goals-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                fiveYearPlan: state.fiveYearPlan,
                yearlyGoals: state.yearlyGoals,
                monthlyPlans: state.monthlyPlans,
                weeklyPlans: state.weeklyPlans,
                dailyTasks: state.dailyTasks,
                isPlanGenerated: state.isPlanGenerated,
                currentYearNumber: state.currentYearNumber,
                currentMonthNumber: state.currentMonthNumber,
            }),
        }
    )
);

// ============================================
// HELPER FUNCTIONS
// ============================================

function getDateForDay(dayOfMonth: number): string {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), dayOfMonth);
    return date.toISOString().split('T')[0];
}

// ============================================
// HOOKS PERSONALIZADOS
// ============================================

export function useFiveYearPlan() {
    return useGoalsStore((state) => ({
        plan: state.fiveYearPlan,
        yearlyGoals: state.yearlyGoals,
        isLoading: state.isLoading,
        isPlanGenerated: state.isPlanGenerated,
    }));
}

export function useActiveMonth() {
    return useGoalsStore((state) => {
        const activeMonth = state.monthlyPlans.find((m) => m.status === 'unlocked');
        const weeklyPlans = activeMonth
            ? state.weeklyPlans.filter((w) => w.monthlyPlanId === activeMonth.id)
            : [];
        return {
            month: activeMonth,
            weeklyPlans,
            isLoading: state.isLoading,
        };
    });
}

export function useCurrentDayTasks() {
    return useGoalsStore((state) => ({
        tasks: state.currentDayTasks,
        toggleTask: state.toggleTask,
        setCurrentDayTasks: state.setCurrentDayTasks,
        isLoading: state.isLoading,
    }));
}

export function usePlanProgress() {
    return useGoalsStore((state) => {
        const totalTasks = state.dailyTasks.length;
        const completedTasks = state.dailyTasks.filter((t) => t.completed).length;
        const currentMonth = state.monthlyPlans.find((m) => m.status === 'unlocked');

        return {
            totalTasks,
            completedTasks,
            progressPercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
            currentMonth,
        };
    });
}
