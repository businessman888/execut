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

## Próximos Passos

1. **Deploy no Railway** para aplicar mudanças no backend
2. Testar fluxo completo do quiz
3. Verificar logs do Railway se houver timeout
