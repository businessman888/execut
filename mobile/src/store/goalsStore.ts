import { create } from 'zustand';

interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    xpReward: number;
    scheduledDate: string;
}

interface GoalsState {
    dailyTasks: Task[];
    currentWeekId: string | null;
    isLoading: boolean;

    // Actions
    setDailyTasks: (tasks: Task[]) => void;
    toggleTask: (taskId: string) => void;
    setLoading: (loading: boolean) => void;
}

export const useGoalsStore = create<GoalsState>((set) => ({
    dailyTasks: [],
    currentWeekId: null,
    isLoading: false,

    setDailyTasks: (dailyTasks) => set({ dailyTasks }),

    toggleTask: (taskId) =>
        set((state) => ({
            dailyTasks: state.dailyTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
        })),

    setLoading: (isLoading) => set({ isLoading }),
}));
