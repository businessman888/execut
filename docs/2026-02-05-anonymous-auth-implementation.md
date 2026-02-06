# Implementação de Autenticação Anônima para Quiz

**Data:** 05 de Fevereiro de 2026

## Problema Identificado

Ao finalizar o quiz de onboarding, o app apresentava o erro:
```
Error: userId must be a UUID
```

### Causa Raiz
- O `OnboardingQuizScreen.tsx` enviava `userId: user?.id || 'anonymous'` para o backend
- Como o usuário não está autenticado durante o onboarding, `user` é `null`
- O backend (`quiz-response.dto.ts`) valida `userId` com `@IsUUID()`, rejeitando `'anonymous'`

---

## Solução Implementada

### 1. Autenticação Anônima do Supabase

Implementamos a funcionalidade de **Anonymous Sign-Ins** do Supabase para criar um usuário temporário com UUID válido antes do quiz começar.

### Arquivos Modificados

#### [authStore.ts](file:///c:/Documentos/execut/execut/mobile/src/store/authStore.ts)

- Adicionado estado `isAnonymous: boolean`
- Adicionado método `signInAnonymously()`:
  ```typescript
  signInAnonymously: async () => {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (data.user) {
          set({
              user: { id: data.user.id, email: '' },
              isAuthenticated: true,
              isAnonymous: true,
          });
      }
  }
  ```
- Modificado `signUp()` para converter usuário anônimo em permanente usando `updateUser()`
- `initialize()` agora detecta se sessão existente é anônima via `session.user.is_anonymous`

#### [RootNavigator.tsx](file:///c:/Documentos/execut/execut/mobile/src/navigation/RootNavigator.tsx)

- Adicionado `useEffect` que chama `signInAnonymously()` ao iniciar o app
- Implementado fallback com UUID local quando Supabase falha (problemas de infraestrutura)
- Loading indicator enquanto inicializa autenticação

```typescript
useEffect(() => {
    const initAuth = async () => {
        await initialize();
        if (!useAuthStore.getState().isAuthenticated) {
            try {
                await signInAnonymously();
            } catch (anonError) {
                // Fallback: gera UUID local
                const { v4: uuidv4 } = await import('uuid');
                const fallbackId = uuidv4();
                useAuthStore.setState({
                    user: { id: fallbackId, email: '' },
                    isAuthenticated: true,
                    isAnonymous: true,
                });
            }
        }
    };
    initAuth();
}, []);
```

#### [OnboardingQuizScreen.tsx](file:///c:/Documentos/execut/execut/mobile/src/screens/auth/OnboardingQuizScreen.tsx)

- Removido fallback `'anonymous'`:
  ```typescript
  // Antes
  userId: user?.id || 'anonymous',
  
  // Depois
  userId: user!.id,
  ```

### Dependências Instaladas

```bash
npm install uuid @types/uuid react-native-get-random-values
```

### Configuração Supabase

Habilitado **Anonymous Sign-Ins** no Supabase Dashboard:
`Authentication > Providers > Enable Anonymous sign-ins`

---

## Otimização da Geração de Planos

### Problema
Erro "Internal server error" após 3 minutos ao gerar plano.

### Análise do Fluxo

1. `OnboardingQuizScreen` → `apiClient.generatePlan(quizData)`
2. `planning.controller.ts` → `planningService.generateInitialPlan(dto)`
3. `planning.service.ts` → `aiAgent.generateFiveYearPlanFromQuiz(dto)`
4. `ai-agent.service.ts` → Chamada à API Anthropic (Claude)

### Correção Aplicada

#### [ai-agent.service.ts](file:///c:/Documentos/execut/execut/backend/src/modules/ai-agent/ai-agent.service.ts)

Aumentado `max_tokens` de 8192 para 20000:

```typescript
const message = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 20000,  // Antes: 8192
    temperature: 0.7,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
});
```

### Arquitetura de Geração de Planos

A geração é feita em etapas para economizar tokens:

1. **Geração Inicial (Quiz):**
   - Visão de 5 anos (objetivos gerais por ano)
   - Ano 01: 12 meses com títulos/objetivos principais
   - Mês 01: Detalhado com 4 semanas e tarefas diárias

2. **Just-in-Time Planning:**
   - Meses 2-12 são expandidos quando usuário completa o mês anterior
   - Chamada `expandMonth()` no último dia do mês

---

## Resumo de Alterações

| Arquivo | Mudança |
|---------|---------|
| `authStore.ts` | +`isAnonymous`, +`signInAnonymously()`, `signUp()` convertendo anônimo |
| `RootNavigator.tsx` | Inicialização anônima + fallback UUID local |
| `OnboardingQuizScreen.tsx` | Removido fallback `'anonymous'` |
| `ai-agent.service.ts` | `max_tokens: 20000` |

---

## Correções de Schema Supabase

### Problema
Erros ao persistir o plano gerado devido a:
1. Colunas faltando na tabela `yearly_goals`
2. Constraint `NOT NULL` em `five_year_plans.title`
3. Foreign keys referenciando `profiles.id` (usuários anônimos não têm perfil)

### Migrações Aplicadas

```sql
-- 1. Adicionar colunas faltando em yearly_goals
ALTER TABLE yearly_goals ADD COLUMN IF NOT EXISTS phase TEXT;
ALTER TABLE yearly_goals ADD COLUMN IF NOT EXISTS revenue_target NUMERIC;
ALTER TABLE yearly_goals ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT false;

-- 2. Tornar title nullable em five_year_plans
ALTER TABLE five_year_plans ALTER COLUMN title DROP NOT NULL;

-- 3. Remover foreign keys que bloqueiam usuários anônimos
ALTER TABLE five_year_plans DROP CONSTRAINT IF EXISTS fk_user;
ALTER TABLE weekly_plans DROP CONSTRAINT IF EXISTS fk_user;
ALTER TABLE monthly_goals DROP CONSTRAINT IF EXISTS fk_user;
-- (e outras tabelas similares)
```

---

## Correções de Interface de Meses (YearDetailScreen)

### Problemas Identificados
1. **Mapeamento de meses incorreto:** Mês 1 do plano = Janeiro (deveria ser Fevereiro)
2. **MonthDetailScreen não encontrava dados:** Lookup usava índice do calendário ao invés do plano
3. **Status incorreto:** FEV e MAR ambos como "Ativo"
4. **Modal sem objetivos:** Meses futuros não mostravam preview dos marcos

### Arquivos Modificados

#### [YearDetailScreen.tsx](file:///c:/Documentos/execut/execut/mobile/src/screens/goals/YearDetailScreen.tsx)

**1. Constante de início do plano:**
```typescript
const PLAN_START_MONTH = 1; // Fevereiro = índice 1 no calendário (0-indexed)
```

**2. Helper para converter índice do plano para calendário:**
```typescript
const getCalendarMonthIndex = (planMonthNumber: number): number => {
    return (PLAN_START_MONTH + planMonthNumber - 1) % 12;
};
```

**3. Mapeamento de meses atualizado:**
```typescript
const months: MonthData[] = yearMonthlyPlans.map((plan) => {
    const calendarIndex = getCalendarMonthIndex(plan.monthNumber);
    return {
        id: plan.id,
        month: monthAbbr[calendarIndex],  // FEV, MAR, etc.
        monthName: monthNames[calendarIndex],
        status: mapStatus(plan.status, plan.monthNumber, PLAN_START_MONTH + 1),
        keyObjectives: plan.keyObjectives || [],
    };
});
```

**4. MonthData interface expandida:**
```typescript
interface MonthData {
    // ... campos existentes
    keyObjectives?: string[];  // 4 objetivos principais do mês
}
```

**5. Navigation com monthId:**
```typescript
navigation.navigate('MonthDetail', {
    month: month.monthName,
    yearNumber: yearNumber,
    monthId: month.id,  // ID direto para lookup preciso
});
```

**6. Modal com 4 objetivos principais:**
```tsx
{previewModal.month?.keyObjectives?.length > 0 && (
    <View style={styles.objectivesList}>
        <Text style={styles.objectivesHeader}>Marcos Principais:</Text>
        {previewModal.month.keyObjectives.map((objective, index) => (
            <View key={index} style={styles.objectiveItem}>
                <View style={styles.objectiveBullet} />
                <Text style={styles.objectiveText}>{objective}</Text>
            </View>
        ))}
    </View>
)}
```

#### [MonthDetailScreen.tsx](file:///c:/Documentos/execut/execut/mobile/src/screens/goals/MonthDetailScreen.tsx)

**Correção do lookup de mês:**
```typescript
const currentMonth = useMemo(() => {
    if (monthId) {
        return monthlyPlans.find((m) => m.id === monthId);
    }
    
    const PLAN_START_MONTH = 1; // Fevereiro
    const calendarMonthIndex = monthNames.indexOf(month);
    
    let planMonthIndex: number;
    if (calendarMonthIndex >= PLAN_START_MONTH) {
        planMonthIndex = calendarMonthIndex - PLAN_START_MONTH + 1;
    } else {
        planMonthIndex = 12 - PLAN_START_MONTH + calendarMonthIndex + 1;
    }
    
    return monthlyPlans.find((m) => m.monthNumber === planMonthIndex);
}, [monthlyPlans, monthId, month]);
```

#### [MonthCard.tsx](file:///c:/Documentos/execut/execut/mobile/src/components/year-detail/MonthCard.tsx)

**Novo status `inactive` adicionado:**
```typescript
export type MonthStatus = 'completed' | 'in_progress' | 'pending' | 'inactive';
```

**Ícones por status:**
- ✅ `completed` - Check verde
- 🔵 `in_progress` - Círculo cyan com progresso
- ⚪ `pending` - Círculo vazio (meses futuros)
- ⚫ `inactive` - Ícone cinza, opacidade 50% (meses passados sem atividade)

---

## Prompt da IA Atualizado

#### [ai-agent.service.ts](file:///c:/Documentos/execut/execut/backend/src/modules/ai-agent/ai-agent.service.ts)

**Adicionado `key_objectives` ao schema do plano:**
```json
"year_01_roadmap": [
    {
        "month": 1, 
        "month_name": "Fevereiro", 
        "objective_title": "Definição de Nicho",
        "objective_description": "Validar nicho e persona ideal", 
        "status": "unlocked", 
        "key_objectives": [
            "Pesquisar mercado", 
            "Definir persona", 
            "Validar proposta de valor", 
            "Mapear concorrentes"
        ]
    }
]
```

---

## Tipos Atualizados

#### [planning.ts](file:///c:/Documentos/execut/execut/mobile/src/types/planning.ts)

```typescript
export interface MonthlyPlan {
    // ... campos existentes
    keyObjectives?: string[]; // 4 principais objetivos do mês
}

// GeneratedPlan type
year_01_roadmap: Array<{
    month: number;
    month_name: string;
    objective_title: string;
    objective_description: string;
    status: 'unlocked' | 'locked';
    key_objectives: string[];  // NOVO
}>;
```

#### [generate-plan.dto.ts](file:///c:/Documentos/execut/execut/backend/src/modules/planning/dto/generate-plan.dto.ts)

```typescript
export class MonthlyRoadmapDto {
    // ... campos existentes
    
    @ApiProperty({ 
        example: ['Objetivo 1', 'Objetivo 2', 'Objetivo 3', 'Objetivo 4'],
        description: '4 principais objetivos do mês' 
    })
    key_objectives: string[];
}
```

---

## goalsStore Atualizado

#### [goalsStore.ts](file:///c:/Documentos/execut/execut/mobile/src/store/goalsStore.ts)

```typescript
setGeneratedPlan: (planId, plan) => {
    const monthlyPlans: MonthlyPlan[] = plan.year_01_roadmap.map((month) => ({
        // ... campos existentes
        keyObjectives: month.key_objectives || [],  // NOVO
    }));
}
```

---

## Resumo Final

| Componente | Alteração |
|------------|-----------|
| `YearDetailScreen` | Mapeamento mês/calendário, monthId na navegação, modal com 4 objetivos |
| `MonthDetailScreen` | Lookup corrigido usando monthId ou planMonthIndex |
| `MonthCard` | Novo status `inactive`, ícones diferenciados por status |
| `ai-agent.service.ts` | Prompt com `key_objectives`, fallback data atualizado |
| `generate-plan.dto.ts` | Campo `key_objectives` no DTO |
| `planning.ts` | `keyObjectives` em MonthlyPlan e GeneratedPlan |
| `goalsStore.ts` | Salva `keyObjectives` ao gerar plano |

## Próximos Passos

1. **Gerar novo plano** para obter os `key_objectives` (planos existentes não têm)
2. Verificar status dos meses no Supabase (MAR deveria ser `locked`)
3. Testar long-press em meses futuros para ver modal com objetivos
4. Testar navegação para MonthDetail em Fevereiro
