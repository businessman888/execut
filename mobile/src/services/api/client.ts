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
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
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
