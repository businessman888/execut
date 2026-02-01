const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

class ApiClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor() {
        this.baseUrl = API_URL;
    }

    setToken(token: string | null) {
        this.token = token;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'API request failed');
        }

        return response.json();
    }

    // Goals
    async getDailyTasks(userId: string, date?: string) {
        const query = date ? `?date=${date}` : '';
        return this.request(`/goals/daily-tasks/${userId}${query}`);
    }

    async toggleTask(taskId: string) {
        return this.request(`/goals/daily-tasks/${taskId}/toggle`, {
            method: 'PUT',
        });
    }

    async getFiveYearPlan(userId: string) {
        return this.request(`/goals/five-year-plan/${userId}`);
    }

    // Gamification
    async getXPAndLevel(userId: string) {
        return this.request(`/gamification/xp/${userId}`);
    }

    async getAchievements(userId: string) {
        return this.request(`/gamification/achievements/${userId}`);
    }

    async getStreak(userId: string) {
        return this.request(`/gamification/streak/${userId}`);
    }

    // Hall of Fame
    async getPosts(page = 1, limit = 20) {
        return this.request(`/hall-of-fame/posts?page=${page}&limit=${limit}`);
    }

    async createPost(userId: string, content: string, postType: string) {
        return this.request('/hall-of-fame/posts', {
            method: 'POST',
            body: JSON.stringify({ userId, content, postType }),
        });
    }

    // Planning
    async submitQuiz(quizData: any) {
        return this.request('/planning/quiz', {
            method: 'POST',
            body: JSON.stringify(quizData),
        });
    }

    async generatePlan(quizData: any) {
        return this.request('/planning/generate-plan', {
            method: 'POST',
            body: JSON.stringify(quizData),
        });
    }

    async getFullPlan(userId: string) {
        return this.request(`/planning/full-plan/${userId}`);
    }

    async getCurrentDayTasks(userId: string) {
        return this.request(`/planning/current-tasks/${userId}`);
    }

    async expandMonth(monthId: string, userId: string) {
        return this.request(`/planning/expand-month/${monthId}`, {
            method: 'POST',
            body: JSON.stringify({ userId }),
        });
    }

    async checkMonthTransition(userId: string) {
        return this.request(`/planning/check-transition/${userId}`);
    }

    async togglePlanningTask(taskId: string, userId: string) {
        return this.request(`/planning/tasks/${taskId}/toggle`, {
            method: 'PUT',
            body: JSON.stringify({ userId }),
        });
    }

    async getWeeklyReview(userId: string) {
        return this.request(`/planning/weekly-review/${userId}`);
    }

    async processRemainingYear1(userId: string) {
        return this.request(`/planning/process-year1/${userId}`, {
            method: 'POST',
        });
    }

    async processMonthTransition(userId: string) {
        return this.request(`/planning/process-month-transition/${userId}`, {
            method: 'POST',
        });
    }

    // Wellness
    async getWellnessRecords(userId: string) {
        return this.request(`/wellness/${userId}`);
    }

    async saveWellnessRecord(userId: string, data: any) {
        return this.request(`/wellness/${userId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

export const apiClient = new ApiClient();
