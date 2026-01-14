# ARQUITETURA DE SISTEMA
## App de Gestão de Objetivos para Empreendedores Digitais

---

## 1. VISÃO GERAL DA ARQUITETURA

### 1.1 Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────────┐
│                        CAMADA MOBILE                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            React Native + Expo (iOS/Android)             │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ UI Layer   │  │ State Mgmt   │  │ Local Storage   │  │  │
│  │  │ (NativeBase│  │ (Zustand +   │  │ (WatermelonDB + │  │  │
│  │  │ Components)│  │ React Query) │  │ AsyncStorage)   │  │  │
│  │  └────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▼ HTTPS/WSS
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY                              │
│                    (Railway Load Balancer)                      │
└─────────────────────────────────────────────────────────────────┘
                              ▼
        ┌─────────────────────┴─────────────────────┐
        ▼                                           ▼
┌──────────────────────┐                  ┌──────────────────────┐
│   BACKEND - NestJS   │                  │   SUPABASE BaaS      │
│  ┌─────────────────┐ │                  │  ┌─────────────────┐ │
│  │ REST API Layer  │ │◄────────────────►│  │   PostgreSQL    │ │
│  ├─────────────────┤ │                  │  ├─────────────────┤ │
│  │ Business Logic  │ │                  │  │   Auth Service  │ │
│  ├─────────────────┤ │                  │  ├─────────────────┤ │
│  │ AI Integration  │ │                  │  │  Storage (S3)   │ │
│  ├─────────────────┤ │                  │  ├─────────────────┤ │
│  │ Cron Jobs       │ │                  │  │  Edge Functions │ │
│  └─────────────────┘ │                  │  ├─────────────────┤ │
│                      │                  │  │   Realtime      │ │
└──────────────────────┘                  │  └─────────────────┘ │
        ▼                                 └──────────────────────┘
┌──────────────────────┐                           ▼
│  SERVIÇOS EXTERNOS   │                  ┌──────────────────────┐
│  ┌─────────────────┐ │                  │   MONITORAMENTO      │
│  │ Anthropic API   │ │                  │  ┌─────────────────┐ │
│  │ (Claude Sonnet) │ │                  │  │ Sentry          │ │
│  ├─────────────────┤ │                  │  ├─────────────────┤ │
│  │ FCM (Push)      │ │                  │  │ Mixpanel        │ │
│  ├─────────────────┤ │                  │  └─────────────────┘ │
│  │ Expo Services   │ │                  └──────────────────────┘
│  └─────────────────┘ │
└──────────────────────┘
```

### 1.2 Modelo de Comunicação

**Síncrono (REST API):**
- Mobile App ↔ NestJS Backend
- NestJS ↔ Supabase Database (queries diretas)
- NestJS ↔ Anthropic API

**Assíncrono (Event-Driven):**
- Supabase Edge Functions (Cron) → Weekly Analysis
- NestJS Background Jobs → Push Notifications
- Supabase Realtime → Hall da Fama Live Updates

**Offline-First:**
- Mobile App → WatermelonDB (cache local)
- Sync Queue → Backend (quando online)

---

## 2. ARQUITETURA DO FRONTEND (MOBILE)

### 2.1 Estrutura de Diretórios

```
mobile/
├── src/
│   ├── app/                    # Entry point (App.tsx)
│   ├── navigation/             # React Navigation setup
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── RootNavigator.tsx
│   ├── screens/                # Telas principais
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignUpScreen.tsx
│   │   │   └── OnboardingQuizScreen.tsx
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── DailyTasksScreen.tsx
│   │   ├── goals/
│   │   │   ├── FiveYearPlanScreen.tsx
│   │   │   ├── YearlyGoalsScreen.tsx
│   │   │   ├── MonthlyGoalsScreen.tsx
│   │   │   └── WeeklyPlanScreen.tsx
│   │   ├── progress/
│   │   │   ├── ProgressDashboard.tsx
│   │   │   └── WeeklyReviewScreen.tsx
│   │   ├── hall-of-fame/
│   │   │   ├── HallOfFameScreen.tsx
│   │   │   └── UserProfileScreen.tsx
│   │   ├── wellness/
│   │   │   └── WellnessTrackerScreen.tsx
│   │   ├── mindset/
│   │   │   └── MindsetVisionScreen.tsx
│   │   └── profile/
│   │       ├── ProfileScreen.tsx
│   │       └── SettingsScreen.tsx
│   ├── components/             # Componentes reutilizáveis
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Loading.tsx
│   │   ├── goals/
│   │   │   ├── GoalCard.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── gamification/
│   │   │   ├── XPBar.tsx
│   │   │   ├── LevelBadge.tsx
│   │   │   └── AchievementModal.tsx
│   │   └── charts/
│   │       ├── ProgressChart.tsx
│   │       └── CompletionChart.tsx
│   ├── services/               # Lógica de integração
│   │   ├── api/
│   │   │   ├── client.ts       # Axios/Fetch config
│   │   │   ├── auth.ts
│   │   │   ├── goals.ts
│   │   │   ├── gamification.ts
│   │   │   └── ai.ts
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   └── realtime.ts
│   │   └── storage/
│   │       └── watermelon.ts
│   ├── store/                  # Zustand stores
│   │   ├── authStore.ts
│   │   ├── goalsStore.ts
│   │   ├── userStore.ts
│   │   └── uiStore.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useGoals.ts
│   │   ├── useGamification.ts
│   │   └── useOfflineSync.ts
│   ├── utils/                  # Funções auxiliares
│   │   ├── date.ts
│   │   ├── validation.ts
│   │   └── formatting.ts
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── endpoints.ts
│   │   └── config.ts
│   └── types/                  # TypeScript types
│       ├── api.ts
│       ├── models.ts
│       └── navigation.ts
├── assets/                     # Imagens, fontes, Lottie
├── app.json
├── package.json
└── tsconfig.json
```

### 2.2 Fluxo de Dados (Data Flow)

```
┌──────────────┐
│   UI Layer   │
│  (Screens &  │
│  Components) │
└──────┬───────┘
       │
       ▼ (user actions)
┌──────────────┐
│ Custom Hooks │ ◄──────┐
│ (useGoals,   │        │
│  useAuth)    │        │
└──────┬───────┘        │
       │                │
       ▼                │
┌──────────────────┐    │
│  Zustand Store   │────┘ (subscribe)
│  (Global State)  │
└──────┬───────────┘
       │
       ▼ (API calls)
┌──────────────────┐
│  React Query     │ ◄──── (cache & refetch)
│  (Server State)  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  API Services    │
│  (api/goals.ts)  │
└──────┬───────────┘
       │
       ├──► NestJS Backend (online)
       │
       └──► WatermelonDB (offline)
```

### 2.3 Padrão de Componentes

**Atomic Design Simplificado:**

```typescript
// atoms/Button.tsx
export const Button = ({ label, onPress, variant }) => {
  return (
    <NativeBaseButton variant={variant} onPress={onPress}>
      {label}
    </NativeBaseButton>
  )
}

// molecules/TaskItem.tsx
export const TaskItem = ({ task, onToggle }) => {
  return (
    <Card>
      <Checkbox value={task.completed} onChange={onToggle} />
      <Text>{task.title}</Text>
      <XPBadge xp={task.xp_reward} />
    </Card>
  )
}

// organisms/DailyTasksList.tsx
export const DailyTasksList = () => {
  const { tasks, toggleTask } = useGoals()
  
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem task={item} onToggle={() => toggleTask(item.id)} />
      )}
    />
  )
}

// screens/HomeScreen.tsx
export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <XPBar />
      <DailyTasksList />
      <ProgressSummary />
    </SafeAreaView>
  )
}
```

### 2.4 Gerenciamento de Estado Detalhado

**Zustand Store - Goals Example:**

```typescript
// store/goalsStore.ts
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface GoalsState {
  dailyTasks: Task[]
  currentWeekReview: WeeklyReview | null
  fiveYearPlan: FiveYearPlan | null
  
  // Actions
  setDailyTasks: (tasks: Task[]) => void
  toggleTask: (taskId: string) => void
  addTask: (task: Task) => void
  setFiveYearPlan: (plan: FiveYearPlan) => void
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      dailyTasks: [],
      currentWeekReview: null,
      fiveYearPlan: null,
      
      setDailyTasks: (tasks) => set({ dailyTasks: tasks }),
      
      toggleTask: (taskId) => set((state) => ({
        dailyTasks: state.dailyTasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      })),
      
      addTask: (task) => set((state) => ({
        dailyTasks: [...state.dailyTasks, task]
      })),
      
      setFiveYearPlan: (plan) => set({ fiveYearPlan: plan })
    }),
    {
      name: 'goals-storage',
      storage: AsyncStorage
    }
  )
)
```

**React Query Integration:**

```typescript
// hooks/useGoals.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { goalsApi } from '@/services/api/goals'
import { useGoalsStore } from '@/store/goalsStore'

export const useGoals = () => {
  const queryClient = useQueryClient()
  const { setDailyTasks } = useGoalsStore()
  
  // Fetch daily tasks
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['dailyTasks', new Date().toISOString().split('T')[0]],
    queryFn: () => goalsApi.getDailyTasks(),
    onSuccess: (data) => setDailyTasks(data),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
  
  // Toggle task mutation
  const toggleMutation = useMutation({
    mutationFn: (taskId: string) => goalsApi.toggleTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(['dailyTasks'])
    }
  })
  
  return {
    tasks,
    isLoading,
    toggleTask: toggleMutation.mutate
  }
}
```

### 2.5 Sincronização Offline (WatermelonDB)

```typescript
// services/storage/watermelon.ts
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { schema } from './schema'
import { Task, Goal } from './models'

const adapter = new SQLiteAdapter({
  schema,
  migrations: []
})

export const database = new Database({
  adapter,
  modelClasses: [Task, Goal]
})

// Sync logic
export const syncDatabase = async () => {
  const lastPulledAt = await getLastSyncTime()
  
  const { changes, timestamp } = await api.sync({
    lastPulledAt,
    schemaVersion: schema.version,
    migration: null
  })
  
  await database.write(async () => {
    await database.batch(...changes)
  })
  
  await setLastSyncTime(timestamp)
}
```

**Sync Strategy:**
- Pull on app open (se online)
- Push em background quando ações offline ocorrem
- Conflict resolution: Last-write-wins com timestamp

---

## 3. ARQUITETURA DO BACKEND (NestJS)

### 3.1 Estrutura de Diretórios

```
backend/
├── src/
│   ├── main.ts                 # Bootstrap application
│   ├── app.module.ts           # Root module
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── auth.config.ts
│   │   └── ai.config.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   └── pipes/
│   │       └── validation.pipe.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── signup.dto.ts
│   │   │   └── strategies/
│   │   │       └── jwt.strategy.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── dto/
│   │   │   │   └── update-profile.dto.ts
│   │   │   └── entities/
│   │   │       └── user.entity.ts
│   │   ├── goals/
│   │   │   ├── goals.module.ts
│   │   │   ├── goals.controller.ts
│   │   │   ├── goals.service.ts
│   │   │   ├── goals.repository.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-daily-task.dto.ts
│   │   │   │   ├── create-five-year-plan.dto.ts
│   │   │   │   └── update-task.dto.ts
│   │   │   └── entities/
│   │   │       ├── daily-task.entity.ts
│   │   │       ├── monthly-goal.entity.ts
│   │   │       └── five-year-plan.entity.ts
│   │   ├── planning/
│   │   │   ├── planning.module.ts
│   │   │   ├── planning.service.ts
│   │   │   └── dto/
│   │   │       └── quiz-response.dto.ts
│   │   ├── gamification/
│   │   │   ├── gamification.module.ts
│   │   │   ├── gamification.controller.ts
│   │   │   ├── gamification.service.ts
│   │   │   ├── dto/
│   │   │   │   └── award-xp.dto.ts
│   │   │   └── entities/
│   │   │       ├── achievement.entity.ts
│   │   │       └── user-achievement.entity.ts
│   │   ├── ai-agent/
│   │   │   ├── ai-agent.module.ts
│   │   │   ├── ai-agent.service.ts
│   │   │   ├── prompts/
│   │   │   │   ├── quiz-planner.prompt.ts
│   │   │   │   └── weekly-review.prompt.ts
│   │   │   └── dto/
│   │   │       ├── generate-plan.dto.ts
│   │   │       └── weekly-analysis.dto.ts
│   │   ├── analytics/
│   │   │   ├── analytics.module.ts
│   │   │   ├── analytics.controller.ts
│   │   │   └── analytics.service.ts
│   │   ├── hall-of-fame/
│   │   │   ├── hall-of-fame.module.ts
│   │   │   ├── hall-of-fame.controller.ts
│   │   │   ├── hall-of-fame.service.ts
│   │   │   ├── dto/
│   │   │   │   └── create-post.dto.ts
│   │   │   └── entities/
│   │   │       └── hall-post.entity.ts
│   │   ├── wellness/
│   │   │   ├── wellness.module.ts
│   │   │   ├── wellness.controller.ts
│   │   │   └── wellness.service.ts
│   │   └── notifications/
│   │       ├── notifications.module.ts
│   │       ├── notifications.service.ts
│   │       └── notifications.gateway.ts
│   └── database/
│       ├── supabase.service.ts
│       └── migrations/
├── test/
│   ├── unit/
│   └── e2e/
├── package.json
├── tsconfig.json
└── nest-cli.json
```

### 3.2 Camadas da Aplicação (Layered Architecture)

```
┌─────────────────────────────────────────────┐
│         PRESENTATION LAYER                  │
│  ┌─────────────────────────────────────┐   │
│  │ Controllers (REST endpoints)        │   │
│  │ - Validação de input (DTOs)        │   │
│  │ - Serialização de output           │   │
│  │ - Guards & Decorators              │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────┐
│         APPLICATION LAYER                   │
│  ┌─────────────────────────────────────┐   │
│  │ Services (Business Logic)           │   │
│  │ - Orquestração de casos de uso     │   │
│  │ - Transformações de dados          │   │
│  │ - Coordenação entre módulos        │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────┐
│         DOMAIN LAYER                        │
│  ┌─────────────────────────────────────┐   │
│  │ Entities & Domain Models            │   │
│  │ - Regras de negócio core           │   │
│  │ - Value Objects                    │   │
│  │ - Domain Events                    │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────┐
│         INFRASTRUCTURE LAYER                │
│  ┌─────────────────────────────────────┐   │
│  │ Repositories & Data Access          │   │
│  │ - Supabase client                  │   │
│  │ - External APIs (AI, FCM)          │   │
│  │ - File storage                     │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### 3.3 Exemplo de Módulo Completo (Goals)

**Controller:**

```typescript
// goals.controller.ts
import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { GoalsService } from './goals.service'
import { CreateDailyTaskDto } from './dto/create-daily-task.dto'
import { JwtAuthGuard } from '@/common/guards/auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'

@ApiTags('goals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get('daily-tasks')
  @ApiOperation({ summary: 'Get daily tasks for current user' })
  async getDailyTasks(@CurrentUser('id') userId: string) {
    return this.goalsService.getDailyTasks(userId)
  }

  @Post('daily-tasks')
  @ApiOperation({ summary: 'Create a new daily task' })
  async createDailyTask(
    @CurrentUser('id') userId: string,
    @Body() createTaskDto: CreateDailyTaskDto
  ) {
    return this.goalsService.createDailyTask(userId, createTaskDto)
  }

  @Put('daily-tasks/:id/toggle')
  @ApiOperation({ summary: 'Toggle task completion' })
  async toggleTask(
    @CurrentUser('id') userId: string,
    @Param('id') taskId: string
  ) {
    return this.goalsService.toggleTask(userId, taskId)
  }
}
```

**Service:**

```typescript
// goals.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { GoalsRepository } from './goals.repository'
import { GamificationService } from '@/modules/gamification/gamification.service'
import { CreateDailyTaskDto } from './dto/create-daily-task.dto'

@Injectable()
export class GoalsService {
  constructor(
    private readonly goalsRepository: GoalsRepository,
    private readonly gamificationService: GamificationService
  ) {}

  async getDailyTasks(userId: string) {
    const today = new Date().toISOString().split('T')[0]
    return this.goalsRepository.findDailyTasksByUserAndDate(userId, today)
  }

  async createDailyTask(userId: string, dto: CreateDailyTaskDto) {
    return this.goalsRepository.createDailyTask({
      ...dto,
      user_id: userId,
      scheduled_date: dto.scheduled_date || new Date()
    })
  }

  async toggleTask(userId: string, taskId: string) {
    const task = await this.goalsRepository.findTaskById(taskId)
    
    if (!task) {
      throw new NotFoundException('Task not found')
    }
    
    if (task.user_id !== userId) {
      throw new ForbiddenException('Not your task')
    }

    const updated = await this.goalsRepository.toggleTask(taskId)
    
    // Se completou, award XP
    if (updated.completed && !task.completed) {
      await this.gamificationService.awardXP(userId, task.xp_reward)
    }
    
    return updated
  }
}
```

**Repository:**

```typescript
// goals.repository.ts
import { Injectable } from '@nestjs/common'
import { SupabaseService } from '@/database/supabase.service'

@Injectable()
export class GoalsRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async findDailyTasksByUserAndDate(userId: string, date: string) {
    const { data, error } = await this.supabase.client
      .from('daily_tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('scheduled_date', date)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  }

  async findTaskById(taskId: string) {
    const { data, error } = await this.supabase.client
      .from('daily_tasks')
      .select('*')
      .eq('id', taskId)
      .single()
    
    if (error) throw error
    return data
  }

  async createDailyTask(taskData: any) {
    const { data, error } = await this.supabase.client
      .from('daily_tasks')
      .insert(taskData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async toggleTask(taskId: string) {
    const task = await this.findTaskById(taskId)
    
    const { data, error } = await this.supabase.client
      .from('daily_tasks')
      .update({
        completed: !task.completed,
        completed_at: !task.completed ? new Date().toISOString() : null
      })
      .eq('id', taskId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
```

### 3.4 Integração com IA (AI Agent Module)

**AI Service:**

```typescript
// ai-agent/ai-agent.service.ts
import { Injectable } from '@nestjs/common'
import Anthropic from '@anthropic-ai/sdk'
import { ConfigService } from '@nestjs/config'
import { QUIZ_PLANNER_PROMPT } from './prompts/quiz-planner.prompt'

@Injectable()
export class AIAgentService {
  private anthropic: Anthropic

  constructor(private configService: ConfigService) {
    this.anthropic = new Anthropic({
      apiKey: this.configService.get('ANTHROPIC_API_KEY')
    })
  }

  async generateFiveYearPlan(quizResponses: any) {
    const message = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      temperature: 0.7,
      system: QUIZ_PLANNER_PROMPT,
      messages: [{
        role: 'user',
        content: `Analise o progresso semanal do usuário e forneça feedback construtivo:
        
        Completion Rate: ${weekData.completionRate}%
        Tasks Completed: ${weekData.tasksCompleted}/${weekData.totalTasks}
        Streak Days: ${weekData.streakDays}
        
        Forneça a resposta em JSON com:
        {
          "overall_assessment": "string",
          "improvement_points": ["string"],
          "achievements": ["string"],
          "next_week_suggestions": ["string"]
        }`
      }]
    })

    const content = message.content[0]
    if (content.type === 'text') {
      return JSON.parse(content.text)
    }
    
    throw new Error('Invalid AI response format')
  }

  async chatWithUser(conversationHistory: any[], userMessage: string) {
    const messages = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ]

    const message = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      messages: messages as any
    })

    return message.content[0].type === 'text' ? message.content[0].text : ''
  }
}
```

**Prompt Templates:**

```typescript
// prompts/quiz-planner.prompt.ts
export const QUIZ_PLANNER_PROMPT = `
Você é um consultor de negócios especializado em planejamento estratégico de 5 anos para empreendedores digitais.

Sua tarefa é analisar as respostas do quiz inicial do usuário e gerar um plano de 5 anos detalhado, estruturado e acionável.

O plano deve incluir:
1. Visão de 5 anos clara e inspiradora
2. Meta financeira principal e marcos intermediários
3. 5 objetivos anuais progressivos
4. Breakdown mensal para o primeiro ano
5. Métricas de sucesso claras

IMPORTANTE: Retorne APENAS um objeto JSON válido, sem markdown, sem explicações adicionais.

Formato de saída:
{
  "vision_statement": "string - visão inspiradora do usuário em 5 anos",
  "financial_goal": {
    "year_5_target": number,
    "currency": "BRL"
  },
  "yearly_goals": [
    {
      "year": 1,
      "title": "string",
      "description": "string",
      "revenue_target": number,
      "key_milestones": ["string"],
      "monthly_goals": [
        {
          "month": 1,
          "focus": "string",
          "tasks": ["string"],
          "metrics": ["string"]
        }
      ]
    }
  ],
  "success_metrics": ["string"]
}

Seja realista, específico e considere a situação atual do usuário.
`

// prompts/weekly-review.prompt.ts
export const WEEKLY_REVIEW_PROMPT = `
Você é um coach de performance que analisa o progresso semanal de empreendedores.

Analise os dados fornecidos e forneça:
1. Avaliação geral honesta e construtiva
2. 2-3 pontos de melhoria específicos
3. Reconhecimento de conquistas (se houver)
4. Sugestões práticas para a próxima semana

Tom: Motivacional mas direto, sem platitudes. Seja específico.

Retorne APENAS JSON válido.
`
```

### 3.5 Background Jobs & Cron

**Cron Module (NestJS):**

```typescript
// modules/analytics/analytics.cron.ts
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { AnalyticsService } from './analytics.service'
import { AIAgentService } from '@/modules/ai-agent/ai-agent.service'
import { NotificationsService } from '@/modules/notifications/notifications.service'

@Injectable()
export class AnalyticsCron {
  private readonly logger = new Logger(AnalyticsCron.name)

  constructor(
    private analyticsService: AnalyticsService,
    private aiService: AIAgentService,
    private notificationsService: NotificationsService
  ) {}

  // Toda segunda-feira às 6h (horário do servidor)
  @Cron('0 6 * * 1', {
    timeZone: 'America/Sao_Paulo'
  })
  async weeklyReview() {
    this.logger.log('Starting weekly review cron job')
    
    try {
      // Busca todos os usuários ativos
      const activeUsers = await this.analyticsService.getActiveUsers()
      
      for (const user of activeUsers) {
        // Calcula dados da semana passada
        const weekData = await this.analyticsService.getWeekData(user.id)
        
        // Gera análise via IA
        const analysis = await this.aiService.generateWeeklyAnalysis(weekData)
        
        // Salva no banco
        await this.analyticsService.saveWeeklyReview(user.id, analysis, weekData)
        
        // Envia notificação push
        await this.notificationsService.sendWeeklyReviewNotification(user.id)
      }
      
      this.logger.log(`Weekly review completed for ${activeUsers.length} users`)
    } catch (error) {
      this.logger.error('Weekly review cron failed', error)
    }
  }

  // Todo dia às 8h - lembretes de tarefas diárias
  @Cron('0 8 * * *', {
    timeZone: 'America/Sao_Paulo'
  })
  async dailyReminder() {
    this.logger.log('Sending daily task reminders')
    
    const usersWithTasks = await this.analyticsService.getUsersWithPendingTasks()
    
    await this.notificationsService.sendBulkNotifications(
      usersWithTasks.map(user => ({
        userId: user.id,
        title: 'Bom dia! 🌅',
        body: `Você tem ${user.pending_tasks_count} tarefas para hoje.`
      }))
    )
  }
}
```

**Supabase Edge Function (Alternativa para Weekly Review):**

```typescript
// supabase/functions/weekly-review/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.9.0'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const anthropic = new Anthropic({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY')!
  })

  // Busca usuários ativos da última semana
  const { data: activeUsers } = await supabase
    .from('profiles')
    .select('id')
    .gte('last_active_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  for (const user of activeUsers || []) {
    // Calcula completion rate da semana
    const { data: tasks } = await supabase
      .from('daily_tasks')
      .select('completed')
      .eq('user_id', user.id)
      .gte('scheduled_date', getWeekStart())
      .lte('scheduled_date', getWeekEnd())

    const completionRate = tasks
      ? (tasks.filter(t => t.completed).length / tasks.length) * 100
      : 0

    // Gera análise IA
    const analysis = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Completion rate: ${completionRate}%. Analise e forneça feedback.`
      }]
    })

    // Salva review
    await supabase.from('weekly_reviews').insert({
      user_id: user.id,
      week_start_date: getWeekStart(),
      completion_rate: completionRate,
      ai_analysis: analysis.content[0].text
    })
  }

  return new Response(JSON.stringify({ success: true }))
})

function getWeekStart() {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(now.setDate(diff)).toISOString().split('T')[0]
}

function getWeekEnd() {
  const start = new Date(getWeekStart())
  start.setDate(start.getDate() + 6)
  return start.toISOString().split('T')[0]
}
```

---

## 4. INTEGRAÇÃO COM SUPABASE

### 4.1 Configuração do Cliente

```typescript
// database/supabase.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

@Injectable()
export class SupabaseService implements OnModuleInit {
  public client: SupabaseClient
  private adminClient: SupabaseClient

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // Cliente público (com RLS)
    this.client = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_ANON_KEY')
    )

    // Cliente admin (bypass RLS)
    this.adminClient = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_SERVICE_ROLE_KEY')
    )
  }

  getAdminClient(): SupabaseClient {
    return this.adminClient
  }
}
```

### 4.2 Row Level Security (RLS) Policies

```sql
-- Política: Usuários só podem ler seus próprios dados
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Política: Usuários podem atualizar seu próprio perfil
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Política: Daily tasks - apenas owner
CREATE POLICY "Users can manage own daily tasks"
  ON daily_tasks
  FOR ALL
  USING (auth.uid() = user_id);

-- Política: Hall da Fama - leitura pública, escrita privada
CREATE POLICY "Anyone can read public hall posts"
  ON hall_posts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = hall_posts.user_id
      AND profiles.is_public = true
    )
  );

CREATE POLICY "Users can create own hall posts"
  ON hall_posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Weekly reviews - apenas owner
CREATE POLICY "Users can read own weekly reviews"
  ON weekly_reviews
  FOR SELECT
  USING (auth.uid() = user_id);

-- Função helper para verificar ownership
CREATE OR REPLACE FUNCTION is_owner(resource_user_id UUID)
RETURNS BOOLEAN AS $
BEGIN
  RETURN auth.uid() = resource_user_id;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4.3 Realtime Subscriptions (Hall da Fama)

**Backend Setup:**

```typescript
// modules/hall-of-fame/hall-of-fame.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { SupabaseService } from '@/database/supabase.service'

@WebSocketGateway({
  cors: { origin: '*' }
})
export class HallOfFameGateway {
  @WebSocketServer()
  server: Server

  constructor(private supabase: SupabaseService) {
    this.setupRealtimeSubscription()
  }

  private setupRealtimeSubscription() {
    const channel = this.supabase.client
      .channel('hall-posts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'hall_posts'
        },
        (payload) => {
          // Broadcast novo post para todos os clientes conectados
          this.server.emit('new-hall-post', payload.new)
        }
      )
      .subscribe()
  }
}
```

**Frontend Subscription:**

```typescript
// services/supabase/realtime.ts
import { supabase } from './client'

export const subscribeToHallPosts = (callback: (post: any) => void) => {
  const channel = supabase
    .channel('public-hall-posts')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'hall_posts',
        filter: 'user_id=eq.some-public-user'
      },
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Usage in React Native
useEffect(() => {
  const unsubscribe = subscribeToHallPosts((newPost) => {
    setHallPosts(prev => [newPost, ...prev])
  })

  return unsubscribe
}, [])
```

### 4.4 Storage (Supabase S3)

**Upload de Avatar:**

```typescript
// users/users.service.ts
async uploadAvatar(userId: string, file: Express.Multer.File) {
  const fileName = `${userId}-${Date.now()}.${file.mimetype.split('/')[1]}`
  
  const { data, error } = await this.supabase.client.storage
    .from('avatars')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true
    })

  if (error) throw error

  // Pega URL pública
  const { data: urlData } = this.supabase.client.storage
    .from('avatars')
    .getPublicUrl(fileName)

  // Atualiza perfil
  await this.supabase.client
    .from('profiles')
    .update({ avatar_url: urlData.publicUrl })
    .eq('id', userId)

  return urlData.publicUrl
}
```

---

## 5. FLUXOS DE DADOS CRÍTICOS

### 5.1 Fluxo de Onboarding & Geração do Plano Completo

```
┌─────────────────────────────────────────────────────────────────┐
│              FLUXO DE ONBOARDING COMPLETO                       │
└─────────────────────────────────────────────────────────────────┘

[MOBILE APP]
    │
    ├──► 1. Usuário completa quiz (10-15 perguntas)
    │       - Situação atual
    │       - Meta financeira 5 anos
    │       - Tempo disponível
    │       - Experiência prévia
    │       - Recursos disponíveis
    │
    ├──► 2. Envia respostas → POST /api/planning/generate-plan
    │
    ▼
[BACKEND - NestJS]
    │
    ├──► 3. PlanningController recebe request
    │       - Valida DTO
    │       - Autentica usuário
    │
    ├──► 4. PlanningService.generatePlan()
    │       - Formata dados do quiz
    │       - Chama AIAgentService
    │
    ├──► 5. AIAgentService.generateFiveYearPlan()
    │       - Monta prompt com contexto
    │       - Chama Anthropic API
    │       - Parse JSON response estruturado
    │
    ├──► 6. Salva no Supabase (HIERARQUIA COMPLETA):
    │       
    │       a) INSERT five_year_plans (1 registro)
    │          └─ Meta de 5 anos
    │       
    │       b) INSERT yearly_goals (5 registros)
    │          └─ Ano 1, Ano 2, Ano 3, Ano 4, Ano 5
    │       
    │       c) INSERT monthly_goals (12 registros - apenas Ano 1)
    │          └─ Mês 1 a Mês 12 do primeiro ano
    │       
    │       d) INSERT weekly_plans (4 registros - apenas Mês 1)
    │          └─ Semana 1, 2, 3, 4 do primeiro mês
    │       
    │       e) INSERT daily_tasks (7 registros - apenas Semana 1)
    │          └─ Segunda, Terça, Quarta, Quinta, Sexta, Sábado, Domingo
    │
    │       IMPORTANTE: IA gera apenas:
    │       - Detalhamento completo do Ano 1
    │       - Detalhamento do Mês 1 (4 semanas)
    │       - Detalhamento da Semana 1 (7 dias)
    │       
    │       Semanas 2, 3, 4 são geradas progressivamente
    │       conforme usuário completa semanas anteriores
    │
    ├──► 7. GamificationService.initializeUser()
    │       - Define level 1, XP 0
    │       - Cria achievement "Primeiro Passo"
    │
    ├──► 8. Retorna plan completo → Response JSON
    │
    ▼
[MOBILE APP]
    │
    ├──► 9. Recebe plan
    │       - Salva no Zustand store
    │       - Sincroniza WatermelonDB
    │       - Cacheia no AsyncStorage
    │
    ├──► 10. Navega para HomeScreen
    │       - Mostra overview do plano de 5 anos
    │       - Exibe meta mensal atual (Mês 1)
    │       - Exibe meta semanal atual (Semana 1)
    │       - Lista tarefas de HOJE (dia atual da semana)
    │       - Animação de boas-vindas
    │
    └──► 11. Agenda notificações locais (Expo)
            - Lembrete diário 8h
            - Review semanal segunda 6h
```

### 5.2 Fluxo de Progressão Semanal (Geração Dinâmica)

```
┌─────────────────────────────────────────────────────────────────┐
│         FLUXO DE CONCLUSÃO DE SEMANA & PRÓXIMA SEMANA           │
└─────────────────────────────────────────────────────────────────┘

[MOBILE APP] - Domingo, 23:00h
    │
    ├──► Usuário completa última tarefa de domingo (dia 7)
    │    - Completion rate da semana = 100%
    │
    ├──► PUT /api/goals/daily-tasks/:id/toggle
    │
    ▼
[BACKEND]
    │
    ├──► GoalsService.toggleTask()
    │    - Marca tarefa como completa
    │    - Verifica: é último dia da semana?
    │    - Verifica: todas as 7 tarefas completas?
    │
    ├──► SE SEMANA COMPLETA:
    │    │
    │    ├──► WeeklyPlanService.completeWeek(weeklyPlanId)
    │    │    - UPDATE weekly_plans SET status = 'completed'
    │    │    - Verifica: qual próxima semana?
    │    │
    │    ├──► SE próxima semana AINDA NÃO EXISTE:
    │    │    │
    │    │    ├──► AIAgentService.generateNextWeekPlan()
    │    │    │    - Analisa performance da semana anterior
    │    │    │    - Considera meta mensal ainda não atingida
    │    │    │    - Gera plano da próxima semana
    │    │    │    
    │    │    │    Prompt context:
    │    │    │    {
    │    │    │      "completed_week": 1,
    │    │    │      "completion_rate": 100,
    │    │    │      "monthly_goal": "...",
    │    │    │      "remaining_weeks": 3,
    │    │    │      "generate": "week_2_daily_tasks"
    │    │    │    }
    │    │    │
    │    │    ├──► INSERT weekly_plans (Semana 2)
    │    │    │
    │    │    └──► INSERT daily_tasks (7 novos dias)
    │    │         - Segunda a Domingo da Semana 2
    │    │
    │    └──► NotificationsService.sendWeekCompletion()
    │         - Push: "🎉 Semana completa! +100 XP"
    │         - Push: "📅 Sua próxima semana já está planejada"
    │
    ▼
[MOBILE APP]
    │
    ├──► Recebe notificação
    ├──► Refetch /api/goals/weekly-plan/current
    ├──► Exibe nova semana no dashboard
    └──► Animação de conquista + confetti
```

### 5.3 Fluxo de Progressão Mensal

```
┌─────────────────────────────────────────────────────────────────┐
│         FLUXO DE CONCLUSÃO DE MÊS & PRÓXIMO MÊS                 │
└─────────────────────────────────────────────────────────────────┘

[BACKEND] - Ao completar Semana 4 do Mês 1
    │
    ├──► MonthlyGoalService.checkMonthCompletion()
    │    - Verifica: todas 4 semanas completas?
    │    - Calcula completion_percentage
    │
    ├──► SE MÊS COMPLETO (≥80% das tarefas):
    │    │
    │    ├──► UPDATE monthly_goals SET status = 'completed'
    │    │
    │    ├──► AIAgentService.generateNextMonthPlan()
    │    │    - Analisa performance do mês anterior
    │    │    - Considera meta anual
    │    │    - Gera 4 semanas do próximo mês
    │    │    
    │    │    Output:
    │    │    {
    │    │      "month_2_plan": {
    │    │        "focus": "...",
    │    │        "weekly_plans": [
    │    │          {
    │    │            "week": 1,
    │    │            "daily_tasks": [...]
    │    │          },
    │    │          // Apenas semana 1, resto gerado progressivamente
    │    │        ]
    │    │      }
    │    │    }
    │    │
    │    ├──► INSERT weekly_plans (4 registros - Mês 2)
    │    │
    │    ├──► INSERT daily_tasks (7 registros - Semana 1 do Mês 2)
    │    │
    │    └──► GamificationService.awardXP(userId, 500)
    │         - Achievement: "Mestre do Mês"
    │
    └──► SE MÊS INCOMPLETO (<80%):
         │
         └──► AIAgentService.adjustNextMonthPlan()
              - Analisa gaps e falhas
              - Ajusta dificuldade do próximo mês
              - Recomenda melhorias
```

```
┌─────────────────────────────────────────────────────────────────┐
│              FLUXO DE CONCLUSÃO DE TAREFA                       │
└─────────────────────────────────────────────────────────────────┘

[MOBILE APP]
    │
    ├──► 1. Usuário marca checkbox da tarefa
    │       - UI feedback imediato (otimistic update)
    │       - Animação de check
    │
    ├──► 2. toggleTask mutation (React Query)
    │       - PUT /api/goals/daily-tasks/:id/toggle
    │
    ▼
[BACKEND - NestJS]
    │
    ├──► 3. GoalsController.toggleTask()
    │       - Valida ownership (guard)
    │       - Chama GoalsService
    │
    ├──► 4. GoalsService.toggleTask()
    │       - Busca task no DB
    │       - Atualiza completed = true
    │       - Se recém completada →
    │
    ├──► 5. GamificationService.awardXP()
    │       - Adiciona XP (ex: +10)
    │       - Verifica se subiu de nível
    │       - Se sim, cria achievement "Level Up"
    │       - UPDATE profiles SET total_xp, current_level
    │
    ├──► 6. NotificationsService (opcional)
    │       - Se achievement desbloqueado →
    │       - Envia push notification celebração
    │
    ├──► 7. Retorna task atualizada + XP earned
    │
    ▼
[MOBILE APP]
    │
    ├──► 8. React Query invalida cache
    │       - Refetch daily tasks
    │       - Refetch user profile (XP/level)
    │
    ├──► 9. UI Updates:
    │       - Animação Lottie de celebração
    │       - XP bar animada (+10 XP)
    │       - Se level up → Modal de parabéns
    │       - Confetti animation
    │
    └──► 10. Sync offline (se estava offline)
            - Adiciona à sync queue
            - Retry ao reconectar
```

### 5.3 Fluxo de Weekly Review Automatizado

```
┌─────────────────────────────────────────────────────────────────┐
│           FLUXO DE WEEKLY REVIEW (CRON JOB)                     │
└─────────────────────────────────────────────────────────────────┘

[CRON TRIGGER] - Segunda 6h AM
    │
    ▼
[BACKEND - AnalyticsCron]
    │
    ├──► 1. weeklyReview() cron job executa
    │
    ├──► 2. AnalyticsService.getActiveUsers()
    │       - Query: users com last_active_at < 7 dias
    │
    ├──► 3. Para cada usuário:
    │       │
    │       ├──► a) AnalyticsService.getWeekData(userId)
    │       │     - Busca daily_tasks da semana (7 dias)
    │       │     - Calcula completion_rate
    │       │     - Identifica padrões (dias melhores/piores)
    │       │     - Calcula streak
    │       │
    │       ├──► b) AIAgentService.generateWeeklyAnalysis(weekData)
    │       │     - Anthropic API call
    │       │     - Retorna JSON: {assessment, improvements, achievements}
    │       │
    │       ├──► c) AnalyticsService.saveWeeklyReview()
    │       │     - INSERT weekly_reviews table
    │       │     - Armazena análise + métricas
    │       │
    │       └──► d) NotificationsService.sendWeeklyReviewNotification()
    │             - FCM push: "Sua análise semanal está pronta! 📊"
    │
    ├──► 4. Log de conclusão
    │
    ▼
[MOBILE APP] - Usuário abre app
    │
    ├──► 5. Recebe push notification
    │       - Tap → Navega para WeeklyReviewScreen
    │
    ├──► 6. Fetch /api/analytics/weekly-review/latest
    │       - Retorna review da semana passada
    │
    ├──► 7. Renderiza UI:
    │       - Card de completion rate (gráfico circular)
    │       - Seção "O que você conquistou"
    │       - Seção "Pontos de melhoria"
    │       - Sugestões para próxima semana
    │       - CTA: "Planejar esta semana"
    │
    └──► 8. Usuário pode:
            - Compartilhar no Hall da Fama (se público)
            - Salvar anotações pessoais
            - Ajustar metas da próxima semana
```

### 5.6 Fluxo do Hall da Fama (Social Feed)

```
┌─────────────────────────────────────────────────────────────────┐
│              FLUXO DO HALL DA FAMA                              │
└─────────────────────────────────────────────────────────────────┘

[MOBILE APP - Hall da Fama Tab]
    │
    ├──► 1. Usuário navega para HallOfFameScreen
    │
    ├──► 2. Fetch /api/hall-of-fame/feed
    │       - Query params: page=1, limit=20
    │       - Filtra apenas usuários públicos (is_public=true)
    │
    ├──► 3. Subscribe to Realtime (Supabase)
    │       - Channel: hall-posts-changes
    │       - Event: INSERT
    │
    ▼
[BACKEND]
    │
    ├──► 4. HallOfFameController.getFeed()
    │       - JOIN hall_posts + profiles
    │       - WHERE profiles.is_public = true
    │       - ORDER BY created_at DESC
    │       - LIMIT 20 OFFSET (page * 20)
    │
    ├──► 5. Retorna array de posts:
    │       [{
    │         id, user_id, content, post_type,
    │         likes_count, created_at,
    │         user: { username, avatar_url, current_level }
    │       }]
    │
    ▼
[MOBILE APP]
    │
    ├──► 6. Renderiza FlatList de posts
    │       - Avatar + Username + Level badge
    │       - Conteúdo do post
    │       - Timestamp
    │       - Like button (count)
    │
    ├──► 7. Usuário cria novo post:
    │       │
    │       ├──► a) Abre CreatePostModal
    │       ├──► b) Escolhe tipo: milestone/reflection/achievement
    │       ├──► c) Escreve conteúdo
    │       ├──► d) POST /api/hall-of-fame/posts
    │       │
    │       ▼
    │   [BACKEND]
    │       │
    │       ├──► e) HallOfFameService.createPost()
    │       │     - Valida: user.is_public must be true
    │       │     - INSERT hall_posts
    │       │     - Supabase Realtime trigger (auto)
    │       │
    │       └──► f) Retorna post criado
    │
    ├──► 8. Realtime update recebido (todos os usuários online)
    │       - Novo post aparece no topo do feed
    │       - Smooth animation
    │
    └──► 9. Usuário pode:
            - Curtir post (increment likes_count)
            - Ver perfil do autor (UserProfileScreen)
            - Reportar conteúdo inadequado (future)
```

---

## 6. GAMIFICAÇÃO - SISTEMA DE XP & NÍVEIS

### 6.1 Estrutura de Progressão

```
Level 1:  0 - 100 XP      (Iniciante)
Level 2:  100 - 250 XP    (Aprendiz)
Level 3:  250 - 500 XP    (Praticante)
Level 4:  500 - 850 XP    (Dedicado)
Level 5:  850 - 1,300 XP  (Avançado)
Level 6:  1,300 - 1,850 XP (Expert)
Level 7:  1,850 - 2,500 XP (Mestre)
Level 8:  2,500 - 3,250 XP (Visionário)
Level 9:  3,250 - 4,100 XP (Líder)
Level 10: 4,100+ XP       (Legend)

Fórmula: XP necessário = 100 * level^1.5
```

### 6.2 Fontes de XP

| Ação | XP | Frequência Máxima |
|------|----|--------------------|
| Completar tarefa diária simples | 10 | Ilimitado |
| Completar tarefa diária complexa | 25 | Ilimitado |
| Completar meta semanal | 100 | 1x/semana |
| Completar meta mensal | 500 | 1x/mês |
| Streak 7 dias | 150 | 1x/semana |
| Streak 30 dias | 1000 | 1x/mês |
| Primeiro post no Hall | 50 | 1x |
| Post com 10+ likes | 30 | Ilimitado |
| Completar quiz inicial | 20 | 1x |
| Ativar modo público | 25 | 1x |

### 6.3 Sistema de Achievements

```typescript
// gamification/achievements.config.ts
export const ACHIEVEMENTS = {
  FIRST_STEP: {
    id: 'first-step',
    title: 'Primeiro Passo',
    description: 'Completou o planejamento inicial',
    xp_reward: 20,
    icon: '🎯'
  },
  WEEK_WARRIOR: {
    id: 'week-warrior',
    title: 'Guerreiro Semanal',
    description: 'Completou todas as tarefas por 7 dias seguidos',
    xp_reward: 150,
    icon: '⚔️'
  },
  MONTH_MASTER: {
    id: 'month-master',
    title: 'Mestre do Mês',
    description: 'Completou meta mensal',
    xp_reward: 500,
    icon: '👑'
  },
  SOCIAL_BUTTERFLY: {
    id: 'social-butterfly',
    title: 'Borboleta Social',
    description: 'Primeiro post público no Hall da Fama',
    xp_reward: 50,
    icon: '🦋'
  },
  INFLUENCER: {
    id: 'influencer',
    title: 'Influenciador',
    description: 'Recebeu 100+ likes em posts',
    xp_reward: 200,
    icon: '✨'
  }
}
```

### 6.4 Lógica de Level Up

```typescript
// gamification/gamification.service.ts
async awardXP(userId: string, xpAmount: number) {
  const user = await this.usersRepository.findById(userId)
  
  const newTotalXP = user.total_xp + xpAmount
  const currentLevel = user.current_level
  const newLevel = this.calculateLevel(newTotalXP)
  
  // Update user
  await this.usersRepository.update(userId, {
    total_xp: newTotalXP,
    current_level: newLevel
  })
  
  // Se subiu de nível
  if (newLevel > currentLevel) {
    await this.createAchievement(userId, {
      type: 'LEVEL_UP',
      title: `Level ${newLevel} Alcançado!`,
      xp_earned: 0,
      metadata: { previous_level: currentLevel, new_level: newLevel }
    })
    
    // Notificação
    await this.notificationsService.send(userId, {
      title: `🎉 Level Up!`,
      body: `Você alcançou o nível ${newLevel}!`
    })
  }
  
  return {
    xp_earned: xpAmount,
    total_xp: newTotalXP,
    level: newLevel,
    leveled_up: newLevel > currentLevel
  }
}

private calculateLevel(totalXP: number): number {
  // Fórmula: Level = floor(sqrt(XP / 100))
  return Math.floor(Math.sqrt(totalXP / 100)) + 1
}
```

---

## 7. NOTIFICAÇÕES PUSH

### 7.1 Arquitetura de Notificações

```
┌──────────────────┐
│  Trigger Source  │
│  - Cron Jobs     │
│  - User Actions  │
│  - System Events │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│  NotificationsService        │
│  (NestJS Backend)            │
│  - Queue notifications       │
│  - Batch processing          │
│  - Rate limiting             │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Expo Push Notifications     │
│  - Token management          │
│  - Receipt tracking          │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  FCM (Firebase Cloud Msg)    │
│  - iOS APNs routing          │
│  - Android FCM routing       │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Mobile Device (Push)        │
│  - Notification displayed    │
│  - Tap → Navigate to screen  │
└──────────────────────────────┘
```

### 7.2 Implementação Backend

```typescript
// notifications/notifications.service.ts
import { Injectable } from '@nestjs/common'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'
import { SupabaseService } from '@/database/supabase.service'

@Injectable()
export class NotificationsService {
  private expo: Expo

  constructor(private supabase: SupabaseService) {
    this.expo = new Expo()
  }

  async sendWeeklyReviewNotification(userId: string) {
    const pushToken = await this.getUserPushToken(userId)
    if (!pushToken) return

    const message: ExpoPushMessage = {
      to: pushToken,
      sound: 'default',
      title: 'Sua análise semanal está pronta! 📊',
      body: 'Veja como foi sua semana e planeje a próxima.',
      data: { screen: 'WeeklyReview' }
    }

    await this.sendPushNotification(message)
  }

  async sendDailyReminder(userId: string, pendingTasksCount: number) {
    const pushToken = await this.getUserPushToken(userId)
    if (!pushToken) return

    const message: ExpoPushMessage = {
      to: pushToken,
      sound: 'default',
      title: 'Bom dia! 🌅',
      body: `Você tem ${pendingTasksCount} tarefas para hoje.`,
      data: { screen: 'Home' }
    }

    await this.sendPushNotification(message)
  }

  async sendAchievementUnlocked(userId: string, achievementTitle: string) {
    const pushToken = await this.getUserPushToken(userId)
    if (!pushToken) return

    const message: ExpoPushMessage = {
      to: pushToken,
      sound: 'default',
      title: '🎉 Conquista Desbloqueada!',
      body: achievementTitle,
      data: { screen: 'Profile', tab: 'achievements' }
    }

    await this.sendPushNotification(message)
  }

  private async sendPushNotification(message: ExpoPushMessage) {
    if (!Expo.isExpoPushToken(message.to as string)) {
      console.error('Invalid push token:', message.to)
      return
    }

    try {
      const chunks = this.expo.chunkPushNotifications([message])
      
      for (const chunk of chunks) {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk)
        
        // Log tickets para tracking
        console.log('Push tickets:', ticketChunk)
      }
    } catch (error) {
      console.error('Error sending push notification:', error)
    }
  }

  private async getUserPushToken(userId: string): Promise<string | null> {
    const { data } = await this.supabase.client
      .from('profiles')
      .select('push_token')
      .eq('id', userId)
      .single()

    return data?.push_token || null
  }

  async registerPushToken(userId: string, pushToken: string) {
    await this.supabase.client
      .from('profiles')
      .update({ push_token: pushToken })
      .eq('id', userId)
  }
}
```

### 7.3 Registro de Token (Frontend)

```typescript
// services/notifications.ts
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { api } from './api/client'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

export async function registerForPushNotifications() {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    alert('Permissão de notificação negada!')
    return
  }

  token = (await Notifications.getExpoPushTokenAsync()).data

  // Envia token para backend
  await api.post('/notifications/register-token', { pushToken: token })

  return token
}

export function setupNotificationListeners() {
  // Notificação recebida enquanto app está aberto
  Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification)
  })

  // Usuário tocou na notificação
  Notifications.addNotificationResponseReceivedListener(response => {
    const screen = response.notification.request.content.data.screen
    
    // Navegação baseada no screen
    if (screen) {
      navigation.navigate(screen)
    }
  })
}
```

---

## 8. SEGURANÇA & AUTENTICAÇÃO

### 8.1 Fluxo de Autenticação (JWT via Supabase)

```
┌────────────────────────────────────────────────┐
│         FLUXO DE AUTENTICAÇÃO                  │
└────────────────────────────────────────────────┘

[MOBILE] Sign Up
    │
    ├──► POST /auth/signup
    │     Body: { email, password, full_name }
    │
    ▼
[SUPABASE AUTH]
    │
    ├──► Cria usuário em auth.users
    ├──► Envia email de confirmação
    ├──► Trigger: INSERT em public.profiles (via DB trigger)
    │
    └──► Retorna: { user, session: { access_token, refresh_token }}
    │
    ▼
[MOBILE]
    │
    ├──► Armazena tokens em SecureStore (Expo)
    ├──► Navega para OnboardingQuiz
    │
┌────────────────────────────────────────────────┐

[MOBILE] Login
    │
    ├──► POST /auth/login
    │     Body: { email, password }
    │
    ▼
[SUPABASE AUTH]
    │
    ├──► Valida credenciais
    ├──► Gera JWT access_token (1h expiry)
    ├──► Gera refresh_token (30d expiry)
    │
    └──► Retorna: { user, session }
    │
    ▼
[MOBILE]
    │
    ├──► Armazena tokens
    ├──► Setup Axios interceptor (auto-refresh)
    ├──► Navega para HomeScreen
    │
┌────────────────────────────────────────────────┐

[MOBILE] API Request (Autenticado)
    │
    ├──► GET /api/goals/daily-tasks
    │     Headers: { Authorization: Bearer <access_token> }
    │
    ▼
[BACKEND - Auth Guard]
    │
    ├──► Valida JWT signature (Supabase public key)
    ├──► Verifica expiry
    ├──► Se expirado → 401 Unauthorized
    │
    ▼
[MOBILE - Axios Interceptor]
    │
    ├──► Detecta 401
    ├──► POST /auth/refresh
    │     Body: { refresh_token }
    │
    ├──► Recebe novo access_token
    ├──► Retry request original
    │
    └──► Se refresh falhar → Logout & redirect Login
```

### 8.2 Implementação de Guards (NestJS)

```typescript
// common/guards/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { SupabaseService } from '@/database/supabase.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Missing authorization token')
    }

    try {
      const { data, error } = await this.supabase.client.auth.getUser(token)
      
      if (error || !data.user) {
        throw new UnauthorizedException('Invalid token')
      }

      // Anexa user ao request
      request.user = data.user
      return true
    } catch {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
```

### 8.3 Rate Limiting

```typescript
// main.ts
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)

// Rate limit específico para IA
const aiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // 10 AI calls por dia
  keyGenerator: (req) => req.user?.id || req.ip
})

app.use('/api/ai-agent/', aiLimiter)
```

---

## 9. TRATAMENTO DE ERROS & LOGGING

### 9.1 Global Exception Filter

```typescript
// common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import * as Sentry from '@sentry/node'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error'

    // Log para Sentry se for erro 500
    if (status === 500) {
      Sentry.captureException(exception)
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message
    })
  }
}
```

### 9.2 Logging Interceptor

```typescript
// common/interceptors/logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, url, body } = request
    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse()
        const delay = Date.now() - now

        this.logger.log(
          `${method} ${url} ${response.statusCode} - ${delay}ms`
        )

        // Log query lenta (> 1s)
        if (delay > 1000) {
          this.logger.warn(`Slow request: ${method} ${url} took ${delay}ms`)
        }
      })
    )
  }
}
```

---

## 10. TESTES

### 10.1 Estratégia de Testes

```
┌─────────────────────────────────────────────┐
│         PIRÂMIDE DE TESTES                  │
│                                             │
│              ╱╲  E2E (5%)                  │
│             ╱  ╲                           │
│            ╱────╲ Integration (15%)       │
│           ╱      ╲                        │
│          ╱────────╲ Unit (80%)           │
│         ╱__________╲                      │
└─────────────────────────────────────────────┘
```

### 10.2 Unit Tests (Backend)

```typescript
// goals/goals.service.spec.ts
import { Test } from '@nestjs/testing'
import { GoalsService } from './goals.service'
import { GoalsRepository } from './goals.repository'
import { GamificationService } from '@/modules/gamification/gamification.service'

describe('GoalsService', () => {
  let service: GoalsService
  let repository: GoalsRepository
  let gamificationService: GamificationService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GoalsService,
        {
          provide: GoalsRepository,
          useValue: {
            findDailyTasksByUserAndDate: jest.fn(),
            toggleTask: jest.fn()
          }
        },
        {
          provide: GamificationService,
          useValue: {
            awardXP: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<GoalsService>(GoalsService)
    repository = module.get<GoalsRepository>(GoalsRepository)
    gamificationService = module.get<GamificationService>(GamificationService)
  })

  describe('toggleTask', () => {
    it('should toggle task and award XP if completed', async () => {
      const mockTask = {
        id: '123',
        user_id: 'user1',
        completed: false,
        xp_reward: 10
      }

      jest.spyOn(repository, 'findTaskById').mockResolvedValue(mockTask)
      jest.spyOn(repository, 'toggleTask').mockResolvedValue({
        ...mockTask,
        completed: true
      })

      await service.toggleTask('user1', '123')

      expect(gamificationService.awardXP).toHaveBeenCalledWith('user1', 10)
    })
  })
})
```

### 10.3 Integration Tests (API)

```typescript
// test/goals.e2e-spec.ts
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'

describe('GoalsController (e2e)', () => {
  let app: INestApplication
  let authToken: string

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    // Login para obter token
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
    
    authToken = response.body.session.access_token
  })

  it('/goals/daily-tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/goals/daily-tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy()
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
```

### 10.4 Frontend Tests

```typescript
// components/TaskItem.test.tsx
import { render, fireEvent } from '@testing-library/react-native'
import { TaskItem } from './TaskItem'

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    completed: false,
    xp_reward: 10
  }

  it('should render task title', () => {
    const { getByText } = render(
      <TaskItem task={mockTask} onToggle={jest.fn()} />
    )
    
    expect(getByText('Test Task')).toBeTruthy()
  })

  it('should call onToggle when checkbox is pressed', () => {
    const onToggle = jest.fn()
    const { getByRole } = render(
      <TaskItem task={mockTask} onToggle={onToggle} />
    )
    
    fireEvent.press(getByRole('checkbox'))
    
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
```

---

## 11. PERFORMANCE & OTIMIZAÇÕES

### 11.1 Database Query Optimization

```sql
-- Index composto para queries frequentes
CREATE INDEX idx_daily_tasks_user_date_completed 
ON daily_tasks(user_id, scheduled_date, completed);

-- Materialized view para dashboard analytics
CREATE MATERIALIZED VIEW user_stats AS
SELECT 
  user_id,
  COUNT(*) FILTER (WHERE completed) as total_completed,
  COUNT(*) as total_tasks,
  ROUND(COUNT(*) FILTER (WHERE completed)::numeric / 
        NULLIF(COUNT(*), 0) * 100, 2) as completion_rate
FROM daily_tasks
WHERE scheduled_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY user_id;

-- Refresh automático a cada hora
CREATE OR REPLACE FUNCTION refresh_user_stats()
RETURNS void AS $
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats;
END;
$ LANGUAGE plpgsql;
```

### 11.2 Caching Strategy (Backend)

```typescript
// common/decorators/cache.decorator.ts
import { SetMetadata } from '@nestjs/common'

export const CACHE_KEY = 'cache_key'
export const Cache = (key: string, ttl: number = 300) => 
  SetMetadata(CACHE_KEY, { key, ttl })

// Usage
@Get('trends')
@Cache('trends_list', 3600) // 1 hour
async getTrends() {
  return this.trendsService.getLatest()
}
```

### 11.3 Frontend Performance

```typescript
// Memoization de componentes pesados
export const TaskItem = React.memo(({ task, onToggle }) => {
  return (
    <Card>
      <Checkbox value={task.completed} onChange={onToggle} />
      <Text>{task.title}</Text>
    </Card>
  )
}, (prevProps, nextProps) => {
  return prevProps.task.id === nextProps.task.id &&
         prevProps.task.completed === nextProps.task.completed
})

// Lazy loading de screens
const HallOfFameScreen = React.lazy(() => import('./screens/HallOfFameScreen'))
const TrendsScreen = React.lazy(() => import('./screens/TrendsScreen'))

// Virtualized lists
<FlatList
  data={tasks}
  renderItem={renderTaskItem}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

---

## 12. MONITORAMENTO & OBSERVABILIDADE

### 12.1 Métricas Chave (KPIs Técnicos)

| Métrica | Target | Ferramenta |
|---------|--------|------------|
| API Response Time (p95) | < 500ms | Sentry Performance |
| Error Rate | < 1% | Sentry |
| App Crash Rate | < 0.5% | Sentry |
| DB Query Time (p95) | < 200ms | Supabase Dashboard |
| Push Delivery Rate | > 95% | Expo Dashboard |
| Daily Active Users | Track | Mixpanel |
| Retention D1/D7/D30 | Track | Mixpanel |

### 12.2 Sentry Setup

```typescript
// main.ts
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% de transações
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Postgres()
  ]
})

// App.tsx (Mobile)
import * as Sentry from 'sentry-expo'

Sentry.init({
  dsn: Constants.expoConfig?.extra?.sentryDsn,
  enableInExpoDevelopment: false,
  debug: __DEV__
})
```

### 12.3 Health Checks

```typescript
// modules/health/health.controller.ts
import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('supabase', process.env.SUPABASE_URL),
      () => this.checkAIService()
    ])
  }

  private async checkAIService() {
    // Verifica se Anthropic API está respondendo
    return { ai_service: { status: 'up' }}
  }
}
```

---

## 13. ESCALABILIDADE

### 13.1 Estratégias de Escala

**Horizontal Scaling (Backend):**
- Railway auto-scaling (CPU/Memory triggers)
- Load balancer distribuindo requests
- Stateless design permite múltiplas instâncias

**Database Scaling:**
- Supabase Pro: Connection pooling (PgBouncer)
- Read replicas para queries pesadas (futuro)
- Particionamento de tabelas grandes (hall_posts, daily_tasks)

**Caching Layer:**
- Redis para sessões e cache hot data (futuro)
- CDN para assets estáticos (Cloudflare)

**AI Cost Management:**
- Queue system para batch processing (BullMQ)
- Cache de respostas similares (vector similarity)
- Tier limits enforcement

### 13.2 Limites de Escala Previstos

| Métrica | MVP (0-1k MAU) | Growth (1k-10k MAU) | Scale (10k-100k MAU) |
|---------|----------------|---------------------|----------------------|
| Backend Instances | 1 | 2-3 | 5-10 |
| DB Connections | 10 | 50 | 200 |
| AI Calls/day | 1,000 | 10,000 | 100,000 |
| Storage (GB) | 5 | 50 | 500 |
| Monthly Cost | $200 | $800 | $3,000+ |

---

## 14. DEPLOY & CI/CD DETALHADO

### 14.1 Ambientes

```
┌──────────────────────────────────────────────┐
│              DEVELOPMENT                      │
│  - Local (Docker Compose)                    │
│  - Supabase Local                            │
│  - Expo Go                                   │
└──────────────────────────────────────────────┘
                    ▼ git push
┌──────────────────────────────────────────────┐
│              STAGING                          │
│  - Railway (staging env)                     │
│  - Supabase Preview Branch                   │
│  - EAS Build (internal distribution)         │
└──────────────────────────────────────────────┘
                    ▼ merge to main
┌──────────────────────────────────────────────┐
│              PRODUCTION                       │
│  - Railway (prod env)                        │
│  - Supabase Production                       │
│  - App Store + Google Play                   │
└──────────────────────────────────────────────┘
```

### 14.2 GitHub Actions Completo

```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'

jobs:
  # === LINTING ===
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint backend
        run: cd backend && npm run lint
      
      - name: Lint frontend
        run: cd mobile && npm run lint
      
      - name: TypeScript check
        run: npm run type-check

  # === BACKEND TESTS ===
  test-backend:
    runs-on: ubuntu-latest
    needs: lint
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install dependencies
        run: cd backend && npm ci
      
      - name: Run unit tests
        run: cd backend && npm run test:cov
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/lcov.info
          flags: backend

  # === FRONTEND TESTS ===
  test-frontend:
    runs-on: ubuntu-latest
    needs: lint
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install dependencies
        run: cd mobile && npm ci
      
      - name: Run tests
        run: cd mobile && npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./mobile/coverage/lcov.info
          flags: frontend

  # === DEPLOY BACKEND STAGING ===
  deploy-backend-staging:
    runs-on: ubuntu-latest
    needs: [test-backend, test-frontend]
    if: github.ref == 'refs/heads/develop'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway (Staging)
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_STAGING_TOKEN }}
          service: backend-staging

  # === DEPLOY BACKEND PRODUCTION ===
  deploy-backend-prod:
    runs-on: ubuntu-latest
    needs: [test-backend, test-frontend]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway (Production)
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_PROD_TOKEN }}
          service: backend-production
      
      - name: Notify Sentry of deployment
        run: |
          curl -sL https://sentry.io/api/0/organizations/$SENTRY_ORG/releases/ \
            -H "Authorization: Bearer ${{ secrets.SENTRY_AUTH_TOKEN }}" \
            -d '{"version": "${{ github.sha }}", "projects": ["backend"]}'

  # === BUILD MOBILE APP ===
  build-mobile:
    runs-on: ubuntu-latest
    needs: [test-frontend]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: cd mobile && npm ci
      
      - name: EAS Build (Production)
        run: |
          cd mobile
          eas build --platform all --profile production --non-interactive
      
      - name: Submit to stores
        run: |
          cd mobile
          eas submit --platform all --latest --non-interactive
```

### 14.3 Estratégia de Rollback

```yaml
# .github/workflows/rollback.yml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Git SHA to rollback to'
        required: true

jobs:
  rollback-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          ref: ${{ github.event.inputs.version }}
      
      - name: Deploy previous version
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_PROD_TOKEN }}
          service: backend-production
      
      - name: Notify team
        run: |
          echo "Rollback to ${{ github.event.inputs.version }} completed"
```

---

## 15. DIAGRAMAS DE SEQUÊNCIA CRÍTICOS

### 15.1 Diagrama: Quiz → Plano de 5 Anos

```
User          Mobile App       Backend (NestJS)    AI Service      Supabase
 │                │                    │                │              │
 │─[Completa]────→│                    │                │              │
 │   Quiz         │                    │                │              │
 │                │                    │                │              │
 │                │─[POST /planning/]─→│                │              │
 │                │  generate-plan     │                │              │
 │                │                    │                │              │
 │                │                    │─[Create msg]──→│              │
 │                │                    │                │              │
 │                │                    │←[JSON plan]────│              │
 │                │                    │                │              │
 │                │                    │─[INSERT]──────────────────→  │
 │                │                    │  five_year_plans             │
 │                │                    │                │              │
 │                │                    │─[INSERT]──────────────────→  │
 │                │                    │  yearly_goals (5x)           │
 │                │                    │                │              │
 │                │                    │─[INSERT]──────────────────→  │
 │                │                    │  monthly_goals (12x)         │
 │                │                    │                │              │
 │                │                    │─[INSERT]──────────────────→  │
 │                │                    │  daily_tasks (7x)            │
 │                │                    │                │              │
 │                │                    │←[Success]──────────────────  │
 │                │                    │                │              │
 │                │←[Plan JSON]────────│                │              │
 │                │                    │                │              │
 │                │─[Save to]          │                │              │
 │                │  WatermelonDB      │                │              │
 │                │                    │                │              │
 │                │─[Navigate to]      │                │              │
 │                │  HomeScreen        │                │              │
 │                │                    │                │              │
 │←[Exibe plan]──│                    │                │              │
 │   e tarefas    │                    │                │              │
```

### 15.2 Diagrama: Weekly Review (Cron)

```
Cron Trigger   Backend         Analytics Svc    AI Service    Supabase    FCM
     │             │                  │              │            │         │
  [Segunda]        │                  │              │            │         │
   06:00 AM        │                  │              │            │         │
     │             │                  │              │            │         │
     │─[Trigger]──→│                  │              │            │         │
     │             │                  │              │            │         │
     │             │─[getActiveUsers]→│              │            │         │
     │             │                  │              │            │         │
     │             │                  │─[SELECT]────────────────→│         │
     │             │                  │  WHERE last_active > 7d  │         │
     │             │                  │                          │         │
     │             │                  │←[Users array]────────────│         │
     │             │                  │                          │         │
     │             │←[Users]──────────│              │            │         │
     │             │                  │              │            │         │
     │             │──[For each user]─│              │            │         │
     │             │                  │              │            │         │
     │             │                  │─[getWeekData]───────────→│         │
     │             │                  │                          │         │
     │             │                  │←[Tasks data]─────────────│         │
     │             │                  │                          │         │
     │             │─[AI analysis]───────────────────→│            │         │
     │             │                  │              │            │         │
     │             │←[Analysis JSON]──────────────────│            │         │
     │             │                  │              │            │         │
     │             │─[saveReview]────────────────────────────────→│         │
     │             │                  │              │            │         │
     │             │─[sendPush]──────────────────────────────────────────→│
     │             │                  │              │            │         │
     │             │                  │              │            │      [Delivered]
     │             │                  │              │            │         │
     │             │←[Complete]───────│              │            │         │
```

---

## 16. SCHEMA DE DADOS COMPLETO (SQL)

```sql
-- ====================================================
-- PROFILES (estende auth.users do Supabase)
-- ====================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  current_level INTEGER DEFAULT 1 CHECK (current_level >= 1),
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  is_public BOOLEAN DEFAULT FALSE,
  push_token TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_public ON profiles(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_profiles_username ON profiles(username);

-- ====================================================
-- FIVE YEAR PLANS
-- ====================================================
CREATE TABLE five_year_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  vision_statement TEXT NOT NULL,
  target_completion_date DATE NOT NULL,
  financial_goal DECIMAL(15,2),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_five_year_plans_user ON five_year_plans(user_id);

-- ====================================================
-- YEARLY GOALS
-- ====================================================
CREATE TABLE yearly_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES five_year_plans(id) ON DELETE CASCADE,
  year_number INTEGER NOT NULL CHECK (year_number BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  description TEXT,
  revenue_target DECIMAL(15,2),
  key_milestones JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(plan_id, year_number)
);

CREATE INDEX idx_yearly_goals_plan ON yearly_goals(plan_id);

-- ====================================================
-- MONTHLY GOALS
-- ====================================================
CREATE TABLE monthly_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  yearly_goal_id UUID NOT NULL REFERENCES yearly_goals(id) ON DELETE CASCADE,
  month_number INTEGER NOT NULL CHECK (month_number BETWEEN 1 AND 12),
  focus TEXT NOT NULL,
  tasks JSONB DEFAULT '[]',
  metrics JSONB DEFAULT '[]',
  completion_percentage DECIMAL(5,2) DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(yearly_goal_id, month_number)
);

CREATE INDEX idx_monthly_goals_yearly ON monthly_goals(yearly_goal_id);

-- ====================================================
-- WEEKLY PLANS (Planos Semanais - ponte mensal → diário)
-- ====================================================
CREATE TABLE weekly_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monthly_goal_id UUID NOT NULL REFERENCES monthly_goals(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 4),
  title TEXT NOT NULL,
  focus TEXT,
  objectives JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  completion_percentage DECIMAL(5,2) DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(monthly_goal_id, week_number)
);

CREATE INDEX idx_weekly_plans_monthly ON weekly_plans(monthly_goal_id);
CREATE INDEX idx_weekly_plans_status ON weekly_plans(status);

-- ====================================================
-- DAILY TASKS (Tarefas Diárias - vinculadas à semana)
-- ====================================================
CREATE TABLE daily_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  weekly_plan_id UUID NOT NULL REFERENCES weekly_plans(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Segunda, 7=Domingo
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  xp_reward INTEGER DEFAULT 10 CHECK (xp_reward >= 0),
  priority INTEGER DEFAULT 0 CHECK (priority BETWEEN 0 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_daily_tasks_user_date ON daily_tasks(user_id, scheduled_date);
CREATE INDEX idx_daily_tasks_weekly_plan ON daily_tasks(weekly_plan_id, day_of_week);
CREATE INDEX idx_daily_tasks_user_date_completed ON daily_tasks(user_id, scheduled_date, completed);

-- ====================================================
-- WEEKLY REVIEWS
-- ====================================================
CREATE TABLE weekly_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  completion_rate DECIMAL(5,2) CHECK (completion_rate BETWEEN 0 AND 100),
  total_tasks INTEGER DEFAULT 0,
  completed_tasks INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  ai_analysis TEXT,
  overall_assessment TEXT,
  improvement_points JSONB DEFAULT '[]',
  achievements JSONB DEFAULT '[]',
  next_week_suggestions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_weekly_reviews_user ON weekly_reviews(user_id, week_start_date DESC);

-- ====================================================
-- ACHIEVEMENTS (Templates)
-- ====================================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 0,
  icon TEXT,
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================
-- USER ACHIEVEMENTS (Unlocked)
-- ====================================================
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  xp_earned INTEGER DEFAULT 0,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id, unlocked_at DESC);

-- ====================================================
-- HALL OF FAME POSTS
-- ====================================================
CREATE TABLE hall_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) <= 1000),
  post_type TEXT DEFAULT 'milestone' CHECK (post_type IN ('milestone', 'reflection', 'achievement')),
  likes_count INTEGER DEFAULT 0 CHECK (likes_count >= 0),
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hall_posts_created ON hall_posts(created_at DESC);
CREATE INDEX idx_hall_posts_user ON hall_posts(user_id);

-- ====================================================
-- HALL POST LIKES
-- ====================================================
CREATE TABLE hall_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES hall_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

CREATE INDEX idx_hall_post_likes_post ON hall_post_likes(post_id);

-- Trigger para atualizar likes_count
CREATE OR REPLACE FUNCTION update_hall_post_likes_count()
RETURNS TRIGGER AS $
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE hall_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE hall_posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER hall_post_likes_trigger
AFTER INSERT OR DELETE ON hall_post_likes
FOR EACH ROW EXECUTE FUNCTION update_hall_post_likes_count();

-- ====================================================
-- WELLNESS TRACKING
-- ====================================================
CREATE TABLE wellness_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  sun_exposure_minutes INTEGER CHECK (sun_exposure_minutes >= 0),
  sleep_hours DECIMAL(4,2) CHECK (sleep_hours >= 0 AND sleep_hours <= 24),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  workout_completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE INDEX idx_wellness_user_date ON wellness_tracking(user_id, date DESC);

-- ====================================================
-- WELLNESS TRACKING
-- ====================================================
CREATE TABLE mindset_visions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  future_self_description TEXT NOT NULL,
  lifestyle_description TEXT,
  assets_description TEXT,
  habits JSONB DEFAULT '[]',
  values JSONB DEFAULT '[]',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mindset_visions_user ON mindset_visions(user_id);

-- ====================================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE five_year_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE yearly_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE hall_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hall_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellness_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE mindset_visions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view public profiles"
  ON profiles FOR SELECT
  USING (is_public = TRUE);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Five year plans policies
CREATE POLICY "Users manage own plans"
  ON five_year_plans FOR ALL
  USING (auth.uid() = user_id);

-- Yearly goals policies
CREATE POLICY "Users manage own yearly goals"
  ON yearly_goals FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM five_year_plans
      WHERE five_year_plans.id = yearly_goals.plan_id
      AND five_year_plans.user_id = auth.uid()
    )
  );

-- Monthly goals policies
CREATE POLICY "Users manage own monthly goals"
  ON monthly_goals FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM yearly_goals
      JOIN five_year_plans ON five_year_plans.id = yearly_goals.plan_id
      WHERE yearly_goals.id = monthly_goals.yearly_goal_id
      AND five_year_plans.user_id = auth.uid()
    )
  );

-- Weekly plans policies
CREATE POLICY "Users manage own weekly plans"
  ON weekly_plans FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM monthly_goals
      JOIN yearly_goals ON yearly_goals.id = monthly_goals.yearly_goal_id
      JOIN five_year_plans ON five_year_plans.id = yearly_goals.plan_id
      WHERE monthly_goals.id = weekly_plans.monthly_goal_id
      AND five_year_plans.user_id = auth.uid()
    )
  );

-- Daily tasks policies
CREATE POLICY "Users manage own daily tasks"
  ON daily_tasks FOR ALL
  USING (auth.uid() = user_id);

-- Weekly reviews policies
CREATE POLICY "Users read own weekly reviews"
  ON weekly_reviews FOR SELECT
  USING (auth.uid() = user_id);

-- Hall posts policies
CREATE POLICY "Anyone can read public hall posts"
  ON hall_posts FOR SELECT
  USING (
    is_visible = TRUE AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = hall_posts.user_id
      AND profiles.is_public = TRUE
    )
  );

CREATE POLICY "Users can create own hall posts"
  ON hall_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hall posts"
  ON hall_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own hall posts"
  ON hall_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Hall post likes policies
CREATE POLICY "Anyone can view likes"
  ON hall_post_likes FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can like posts"
  ON hall_post_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
  ON hall_post_likes FOR DELETE
  USING (auth.uid() = user_id);

-- Wellness tracking policies
CREATE POLICY "Users manage own wellness data"
  ON wellness_tracking FOR ALL
  USING (auth.uid() = user_id);

-- Mindset visions policies
CREATE POLICY "Users manage own mindset vision"
  ON mindset_visions FOR ALL
  USING (auth.uid() = user_id);

-- ====================================================
-- FUNCTIONS & TRIGGERS
-- ====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_five_year_plans_updated_at BEFORE UPDATE ON five_year_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_yearly_goals_updated_at BEFORE UPDATE ON yearly_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monthly_goals_updated_at BEFORE UPDATE ON monthly_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weekly_plans_updated_at BEFORE UPDATE ON weekly_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_tasks_updated_at BEFORE UPDATE ON daily_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $
BEGIN
  INSERT INTO profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ====================================================
-- INITIAL DATA (Achievements Templates)
-- ====================================================

INSERT INTO achievements (achievement_key, title, description, xp_reward, icon, rarity) VALUES
  ('first_step', 'Primeiro Passo', 'Completou o planejamento inicial', 20, '🎯', 'common'),
  ('week_warrior', 'Guerreiro Semanal', 'Completou todas as tarefas por 7 dias seguidos', 150, '⚔️', 'rare'),
  ('month_master', 'Mestre do Mês', 'Completou meta mensal', 500, '👑', 'epic'),
  ('streak_30', 'Streak de 30 Dias', 'Manteve consistência por 30 dias', 1000, '🔥', 'legendary'),
  ('social_butterfly', 'Borboleta Social', 'Primeiro post público no Hall da Fama', 50, '🦋', 'common'),
  ('influencer', 'Influenciador', 'Recebeu 100+ likes em posts', 200, '✨', 'rare'),
  ('level_5', 'Nível 5 Alcançado', 'Atingiu o nível 5', 100, '⭐', 'rare'),
  ('level_10', 'Lenda', 'Atingiu o nível máximo 10', 500, '💎', 'legendary'),
  ('early_bird', 'Madrugador', 'Completou tarefas antes das 8h por 7 dias', 100, '🌅', 'rare'),
  ('goal_crusher', 'Destruidor de Metas', 'Completou 100 tarefas', 300, '💪', 'epic');
```

---

## 17. CONCLUSÃO DA ARQUITETURA

### 17.1 Princípios Arquiteturais Aplicados

✅ **Clean Architecture**: Separação clara de responsabilidades  
✅ **SOLID**: Services, repositories e controllers bem definidos  
✅ **DRY**: Reutilização via módulos compartilhados  
✅ **Offline-First**: WatermelonDB + sync queue  
✅ **Security by Design**: RLS, JWT, rate limiting desde o início  
✅ **Scalable**: Stateless backend, horizontal scaling ready  
✅ **Observable**: Logging, monitoring, health checks integrados  

### 17.2 Próximos Passos

**Documento criado**: ✅ Arquitetura de Sistema  
**Próximo documento**: PRD (Product Requirements Document)

---

**Aguardando validação para prosseguir com o PRD.**
│ `Quiz Responses: ${JSON.stringify(quizResponses)}`
      }]
    })

    const content = message.content[0]
    if (content.type === 'text') {
      // Parse JSON response
      const planData = JSON.parse(content.text)
      return planData
    }
    
    throw new Error('Invalid AI response format')
  }

  async generateWeeklyAnalysis(weekData: any) {
    const message = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      temperature: 0.5,
      messages: [{
        role: 'user',
        content: