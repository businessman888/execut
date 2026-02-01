// ============================================
// TIPOS DO SISTEMA DE PLANEJAMENTO DE 5 ANOS
// ============================================

// === TAREFAS DIÁRIAS ===
export interface DailyTask {
    id: string;
    weeklyPlanId: string;
    userId: string;
    scheduledDate: string; // YYYY-MM-DD
    title: string;
    description: string | null;
    category: string | null;
    xpReward: number;
    completed: boolean;
    completedAt: string | null;
    createdAt: string;
}

// === PLANOS SEMANAIS ===
export interface WeeklyPlan {
    id: string;
    monthlyPlanId: string;
    weekNumber: number;
    dateRange: string;
    title: string;
    description: string | null;
    status: 'pending' | 'current' | 'completed';
    progress: number;
    createdAt: string;
    dailyTasks?: DailyTask[];
}

// === PLANOS MENSAIS ===
export interface MonthlyPlan {
    id: string;
    yearlyGoalId: string;
    monthNumber: number;
    objectiveTitle: string;
    objectiveDescription: string | null;
    status: 'locked' | 'unlocked' | 'completed';
    progress: number;
    unlockedAt: string | null;
    createdAt: string;
    weeklyPlans?: WeeklyPlan[];
}

// === METAS ANUAIS ===
export interface YearlyGoal {
    id: string;
    planId: string;
    yearNumber: number;
    phase: string;
    title: string;
    revenueTarget: number;
    isActive: boolean;
    createdAt: string;
    monthlyPlans?: MonthlyPlan[];
}

// === PLANO DE 5 ANOS ===
export interface FiveYearPlan {
    id: string;
    userId: string;
    visionStatement: string;
    financialGoal5Y: number;
    quizResponses: Record<string, any>;
    status: 'active' | 'completed' | 'archived';
    createdAt: string;
    updatedAt: string;
    yearlyGoals?: YearlyGoal[];
}

// ============================================
// TIPOS DO QUIZ
// ============================================

export type ProfessionalSituation =
    | 'clt'
    | 'unemployed'
    | 'freelancer'
    | 'digital_entrepreneur_disorganized'
    | 'established_business';

export type StartingPoint =
    | 'lost'
    | 'no_execution'
    | 'chaos'
    | 'slave'
    | 'transition';

export type QuizRoute = 'A' | 'B' | 'hybrid';

export interface QuizResponses {
    userId: string;
    name: string;
    age: number;
    professionalSituation: ProfessionalSituation;
    startingPoint: StartingPoint;
    route: QuizRoute;
    routeResponses: Record<string, string>;
    behavioralAudit: Record<string, string>;
    biohackingResponses: Record<string, string>;
    vision5Years: Record<string, string>;
    financialGoal5Years?: number;
    currentIncome?: number;
}

// ============================================
// TIPOS DE RESPOSTA DA API
// ============================================

export interface GeneratedPlan {
    vision_statement: string;
    vision_5_years: Array<{
        year: number;
        phase: string;
        goal: string;
        revenue_target: number;
    }>;
    year_01_roadmap: Array<{
        month: number;
        month_name: string;
        objective_title: string;
        objective_description: string;
        status: 'unlocked' | 'locked';
    }>;
    month_01_detail: {
        focus: string;
        weeks: Array<{
            week_number: number;
            date_range: string;
            title: string;
            description: string;
            daily_tasks: Array<{
                day: number;
                day_name: string;
                tasks: Array<{
                    title: string;
                    description: string;
                    category: string;
                    xp_reward: number;
                }>;
            }>;
        }>;
    };
}

export interface GeneratePlanResponse {
    plan: GeneratedPlan;
    planId: string;
}

export interface FullPlanResponse {
    plan: FiveYearPlan;
    yearlyGoals: YearlyGoal[];
    monthlyPlans: MonthlyPlan[];
    weeklyPlans: WeeklyPlan[];
}

// ============================================
// TIPOS DE NAVEGAÇÃO
// ============================================

export interface YearDetailParams {
    yearNumber: number;
    phase: string;
    title: string;
    revenueTarget: number;
    yearlyGoalId: string;
}

export interface MonthDetailParams {
    monthNumber: number;
    monthTitle: string;
    monthDescription: string | null;
    monthStatus: 'locked' | 'unlocked' | 'completed';
    yearNumber: number;
    monthlyPlanId: string;
}

export interface WeekDetailParams {
    weekNumber: number;
    dateRange: string;
    title: string;
    monthNumber: number;
    weeklyPlanId: string;
}
