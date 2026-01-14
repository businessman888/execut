// User types
export interface User {
    id: string;
    email: string;
    fullName?: string;
    createdAt: string;
}

export interface Profile {
    id: string;
    email?: string;
    username?: string;
    fullName?: string;
    avatarUrl?: string;
    bio?: string;
    currentLevel: number;
    totalXp: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

// Goals types
export interface FiveYearPlan {
    id: string;
    userId: string;
    title: string;
    visionStatement: string;
    targetCompletionDate?: string;
    status: 'active' | 'completed' | 'archived';
    createdAt: string;
}

export interface YearlyGoal {
    id: string;
    planId: string;
    yearNumber: number; // 1-5
    title: string;
    description?: string;
    targetAmount?: number;
    status: 'pending' | 'in_progress' | 'completed';
    createdAt: string;
}

export interface MonthlyGoal {
    id: string;
    yearlyGoalId: string;
    monthNumber: number; // 1-12
    title: string;
    focus?: string;
    completionPercentage: number;
    createdAt: string;
}

export interface WeeklyPlan {
    id: string;
    monthlyGoalId: string;
    weekNumber: number; // 1-4
    title: string;
    focus?: string;
    status: 'pending' | 'in_progress' | 'completed';
    createdAt: string;
}

export interface DailyTask {
    id: string;
    userId: string;
    weeklyPlanId?: string;
    dayOfWeek: number; // 1-7
    title: string;
    description?: string;
    scheduledDate: string;
    completed: boolean;
    completedAt?: string;
    xpReward: number;
    createdAt: string;
}

// Gamification types
export interface Achievement {
    id: string;
    type: string;
    title: string;
    description: string;
    xpReward: number;
    iconName: string;
}

export interface UserAchievement {
    id: string;
    userId: string;
    achievementType: string;
    title: string;
    xpEarned: number;
    unlockedAt: string;
}

// Hall of Fame types
export interface HallPost {
    id: string;
    userId: string;
    content: string;
    postType: 'milestone' | 'reflection' | 'achievement';
    likesCount: number;
    createdAt: string;
}

export interface PostLike {
    id: string;
    postId: string;
    userId: string;
    createdAt: string;
}

// Wellness types
export interface WellnessRecord {
    id: string;
    userId: string;
    date: string;
    sunExposureMinutes?: number;
    sleepHours?: number;
    energyLevel?: number; // 1-10
    exercised?: boolean;
    notes?: string;
    createdAt: string;
}

// Mindset types
export interface MindsetVision {
    id: string;
    userId: string;
    futureDescription?: string;
    lifestyle?: string;
    achievements?: string;
    habits: string[];
    values: string[];
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// Weekly Review types
export interface WeeklyReview {
    id: string;
    userId: string;
    weekStartDate: string;
    weekEndDate: string;
    completionRate: number;
    aiAnalysis?: string;
    improvementPoints?: string[];
    achievements?: string[];
    createdAt: string;
}

// Quiz types
export interface QuizResponse {
    userId: string;
    professionalSituation: 'clt' | 'freelancer' | 'early_entrepreneur' | 'established_entrepreneur' | 'student';
    financialGoal5Years: number;
    currentIncome: number;
    availableTime: string;
    experienceLevel: 'none' | 'beginner' | 'intermediate' | 'advanced';
    businessArea: string;
    initialInvestment: string;
    biggestChallenge: string;
    currentHabits: string;
    mainMotivation: string;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
