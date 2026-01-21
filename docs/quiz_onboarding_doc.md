# Quiz Onboarding - Documentação de Contexto

> Documentação do trabalho realizado para implementar o fluxo de onboarding/quiz do aplicativo **Execut**.

## Visão Geral

O aplicativo Execut possui um fluxo de onboarding que usuários novos percorrem antes de acessar o app principal. Este quiz segue o modelo **one-page** - uma única tela (`OnboardingQuizScreen`) que muda o conteúdo à medida que o usuário avança pelos steps.

### Fluxo de Navegação
```
Usuário novo → Quiz Onboarding → Autenticação → Home (app principal)
Usuário autenticado → Home (direto)
```

---

## Etapas Implementadas

### 1️⃣ Nome/Codinome
| Elemento | Descrição |
|----------|-----------|
| Pergunta | "Antes de traçarmos **seu plano:** Como devemos te chamar?" |
| Input | Campo de texto com placeholder |
| Validação | Obrigatório, não pode ser vazio |

### 2️⃣ Idade
| Elemento | Descrição |
|----------|-----------|
| Pergunta | "Quantos anos você tem hoje?" |
| Input | Picker de scroll vertical (14-80 anos) |
| Default | 26 anos |
| Botões | Voltar + Continuar |

### 3️⃣ Situação Profissional
| Elemento | Descrição |
|----------|-----------|
| Pergunta | "Qual é a sua **situação** Profissional atual?" |
| Opções | Cards com ícone, título e descrição |
| Botões | Voltar + Continuar |

**Opções disponíveis:**
- 💼 Empregado / CLT - Regime corporativo fixo
- ↔️ Transição de carreira - Buscando novos horizontes
- 🚀 Empreendedor/Founder - Construindo negócio próprio
- 👤 Autônomo/Freelancer - Operando independente
- 📊 Executivo/C-Level - Liderança estratégica

---

## Arquivos Criados

### Componentes de Quiz
```
mobile/src/components/quiz/
├── index.ts                    # Barrel file
├── QuizHeader.tsx              # Header com "Pontuação" + badge XP
├── QuizProgressIndicator.tsx   # Texto "Progresso: X%"
├── QuizContainer.tsx           # Container + botões Voltar/Continuar
├── AgePicker.tsx               # Picker de idade com scroll
└── QuizRadioGroup.tsx          # Cards de opção com ícone/descrição
```

### Screens
```
mobile/src/screens/auth/
└── OnboardingQuizScreen.tsx    # Tela principal do quiz (refatorada)
```

### Navegação
```
mobile/src/navigation/
└── RootNavigator.tsx           # Atualizado para iniciar no quiz
```

---

## Estrutura do Quiz (QUIZ_STEPS)

```typescript
const QUIZ_STEPS = [
    { id: 'name', type: 'text', ... },
    { id: 'age', type: 'age', ... },
    { id: 'professionalSituation', type: 'radioGroup', ... },
    // ... outros steps existentes (financialGoal, etc)
];
```

### Tipos de Step
| Tipo | Componente | Uso |
|------|------------|-----|
| `text` | `QuizInput` | Campos de texto simples |
| `number` | `QuizInput` | Campos numéricos |
| `age` | `AgePicker` | Seletor de idade scroll |
| `radio` | Inline (Box + Pressable) | Opções simples |
| `radioGroup` | `QuizRadioGroup` | Cards com ícone/descrição |

---

## Design System

### Cores Principais
| Token | Valor | Uso |
|-------|-------|-----|
| `accent.400` | `#33CFFF` | Elementos destacados, selecionados |
| `background.primary` | `#0D0D0D` | Fundo da tela |
| `surface.primary` | `#1A1A1A` | Fundo de cards |
| `text.primary` | `#FFFFFF` | Texto principal |
| `text.tertiary` | `#6B7280` | Texto secundário/descrições |

### Componentes UI
O projeto usa componentes customizados em `components/ui/index.tsx` como substitutos do native-base:
- `Box`, `VStack`, `HStack`, `Text`, `Button`, `Pressable`, `ScrollView`, etc.

---

## Referências do Figma

| Etapa | Node ID | Link |
|-------|---------|------|
| Nome | `101-142` | [Figma](https://www.figma.com/design/Qmhdm8v6WqV6PkX9AvmRuH/execut?node-id=101-142&m=dev) |
| Idade | `107-213` | [Figma](https://www.figma.com/design/Qmhdm8v6WqV6PkX9AvmRuH/execut?node-id=107-213&m=dev) |
| Situação Profissional | `110-192` | [Figma](https://www.figma.com/design/Qmhdm8v6WqV6PkX9AvmRuH/execut?node-id=110-192&m=dev) |

---

## Próximos Passos Sugeridos

- [ ] Implementar mais etapas do quiz (meta financeira, tempo disponível, etc.)
- [ ] Adicionar animações de transição entre steps
- [ ] Persistir respostas do quiz (AsyncStorage ou API)
- [ ] Conectar navegação ao fluxo de autenticação
- [ ] Implementar tela de autenticação (login/signup)

---

## Notas Técnicas

### Lint Warnings
Alguns warnings de TypeScript aparecem relacionados a tipagem do React Native (`View`, `ScrollView`, `TextInput`). Estes são falsos positivos causados por configuração do TypeScript no projeto e **não afetam o funcionamento**.

### Servidor de Desenvolvimento
```bash
cd mobile
npm start
```
