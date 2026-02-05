import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { QuizResponseDto } from '../planning/dto/quiz-response.dto';
import { GeneratedPlanDto, ExpandMonthRequestDto, MonthDetailDto } from '../planning/dto/generate-plan.dto';

@Injectable()
export class AIAgentService {
    private readonly logger = new Logger(AIAgentService.name);
    private anthropic: Anthropic;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');
        if (apiKey && apiKey !== 'your-anthropic-api-key') {
            this.anthropic = new Anthropic({ apiKey });
        }
    }

    private get isConfigured(): boolean {
        return !!this.anthropic;
    }

    // ============================================
    // GERAÇÃO DO PLANO INICIAL (30 respostas do quiz)
    // ============================================

    async generateFiveYearPlanFromQuiz(quizResponses: QuizResponseDto): Promise<GeneratedPlanDto> {
        if (!this.isConfigured) {
            this.logger.warn('Anthropic API not configured, using fallback plan');
            return this.getFallbackPlan(quizResponses);
        }

        try {
            const systemPrompt = this.getInitialPlanSystemPrompt();
            const userPrompt = this.formatQuizResponsesForAI(quizResponses);

            const message = await this.anthropic.messages.create({
                model: 'claude-sonnet-4-5-20250929',
                max_tokens: 20000,
                temperature: 0.7,
                system: systemPrompt,
                messages: [{
                    role: 'user',
                    content: userPrompt,
                }],
            });

            const content = message.content[0];
            if (content.type === 'text') {
                const parsed = this.parseAndValidateResponse(content.text);
                this.logger.log('Successfully generated 5-year plan from AI');
                return parsed;
            }

            throw new Error('Invalid AI response type');
        } catch (error) {
            this.logger.error('AI generation error:', error);
            return this.getFallbackPlan(quizResponses);
        }
    }

    // ============================================
    // EXPANSÃO DE MÊS (Just-in-Time Planning)
    // ============================================

    async expandMonth(request: ExpandMonthRequestDto, monthObjective: string): Promise<MonthDetailDto> {
        if (!this.isConfigured) {
            return this.getFallbackMonthDetail();
        }

        try {
            const systemPrompt = this.getExpandMonthSystemPrompt();
            const userPrompt = `
Expanda o seguinte mês com tarefas detalhadas:

OBJETIVO DO MÊS: ${monthObjective}

CONTEXTO DO MÊS ANTERIOR:
- Progresso: ${request.previousMonthProgress}%
- Tarefas completadas: ${request.previousMonthTasksCompleted}/${request.previousMonthTasksTotal}

Gere 4 semanas com tarefas diárias específicas e acionáveis.
`;

            const message = await this.anthropic.messages.create({
                model: 'claude-sonnet-4-5-20250929',
                max_tokens: 4096,
                temperature: 0.7,
                system: systemPrompt,
                messages: [{
                    role: 'user',
                    content: userPrompt,
                }],
            });

            const content = message.content[0];
            if (content.type === 'text') {
                return JSON.parse(content.text);
            }

            throw new Error('Invalid AI response type');
        } catch (error) {
            this.logger.error('AI expand month error:', error);
            return this.getFallbackMonthDetail();
        }
    }

    // ============================================
    // ANÁLISE SEMANAL
    // ============================================

    async generateWeeklyAnalysis(weekData: Record<string, any>) {
        if (!this.isConfigured) {
            return this.getFallbackAnalysis(weekData);
        }

        try {
            const message = await this.anthropic.messages.create({
                model: 'claude-sonnet-4-5-20250929',
                max_tokens: 1024,
                messages: [{
                    role: 'user',
                    content: `Analise o progresso semanal do usuário:
Completion Rate: ${weekData.completionRate}%
Tasks Completed: ${weekData.tasksCompleted}/${weekData.totalTasks}
Streak Days: ${weekData.streakDays}

Retorne JSON com: overall_assessment, improvement_points[], achievements[], next_week_suggestions[]`,
                }],
            });

            const content = message.content[0];
            if (content.type === 'text') {
                return JSON.parse(content.text);
            }
        } catch (error) {
            this.logger.error('AI analysis error:', error);
            return this.getFallbackAnalysis(weekData);
        }
    }

    // ============================================
    // SYSTEM PROMPTS
    // ============================================

    private getInitialPlanSystemPrompt(): string {
        return `Você é um consultor de negócios ELITE especializado em planejamento estratégico de 5 anos para empreendedores digitais brasileiros.

TAREFA: Analise as respostas do quiz e gere um plano ULTRA-DETALHADO e PERSONALIZADO.

REGRAS CRÍTICAS:
1. PERSONALIZE TUDO baseado nas respostas - não use templates genéricos
2. Se ROTA A (perdido/zero): foque em clareza, primeiros passos, validação
3. Se ROTA B (já empreende): foque em otimização, processos, escala
4. Revenue targets devem ser PROGRESSIVOS e REALISTAS baseados na situação atual
5. Tarefas diárias devem ser ACIONÁVEIS, ESPECÍFICAS e mensuráveis
6. XP reward proporcional à dificuldade (10=fácil, 25=médio, 50=difícil)
7. Considere o tempo disponível informado pelo usuário
8. O mês 01 é FEVEREIRO/2026 (mês atual)

RETORNE APENAS JSON VÁLIDO (sem markdown, sem \`\`\`) com esta estrutura EXATA:

{
  "vision_statement": "Descrição inspiradora e específica do futuro do usuário em 5 anos",
  "vision_5_years": [
    {"year": 1, "phase": "IMPLANTAÇÃO", "goal": "Meta específica do ano 1", "revenue_target": 10000},
    {"year": 2, "phase": "EXPANSÃO", "goal": "Meta específica do ano 2", "revenue_target": 25000},
    {"year": 3, "phase": "MATURIDADE", "goal": "Meta específica do ano 3", "revenue_target": 50000},
    {"year": 4, "phase": "GLOBALIZAÇÃO", "goal": "Meta específica do ano 4", "revenue_target": 100000},
    {"year": 5, "phase": "LEGADO", "goal": "Meta final específica", "revenue_target": 200000}
  ],
  "year_01_roadmap": [
    {"month": 1, "month_name": "Fevereiro", "objective_title": "Título curto", "objective_description": "Descrição do objetivo", "status": "unlocked"},
    {"month": 2, "month_name": "Março", "objective_title": "...", "objective_description": "...", "status": "locked"},
    ... até month 12 (Fevereiro, Março, Abril, Maio, Junho, Julho, Agosto, Setembro, Outubro, Novembro, Dezembro, Janeiro)
  ],
  "month_01_detail": {
    "focus": "Foco principal do mês",
    "weeks": [
      {
        "week_number": 1,
        "date_range": "01-07 FEV",
        "title": "Título da semana",
        "description": "Descrição da semana",
        "daily_tasks": [
          {
            "day": 1,
            "day_name": "Sab",
            "tasks": [
              {"title": "Tarefa específica", "description": "Detalhes", "category": "Estratégia|Marketing|Vendas|Produto|Operações", "xp_reward": 25}
            ]
          }
          ... até day 7
        ]
      }
      ... 4 semanas
    ]
  }
}`;
    }

    private getExpandMonthSystemPrompt(): string {
        return `Você é um consultor de negócios especializado em planejamento mensal.

TAREFA: Expanda um mês com 4 semanas de tarefas diárias.

REGRAS:
1. Cada semana deve ter 7 dias com tarefas específicas
2. Tarefas devem ser ACIONÁVEIS e mensuráveis
3. Considere o progresso do mês anterior para ajustar intensidade
4. XP: 10-15 (fácil), 20-30 (médio), 35-50 (difícil)

RETORNE APENAS JSON VÁLIDO com a estrutura de MonthDetailDto.`;
    }

    // ============================================
    // HELPERS
    // ============================================

    private formatQuizResponsesForAI(quiz: QuizResponseDto): string {
        return `
=== PERFIL DO USUÁRIO ===
Nome: ${quiz.name}
Idade: ${quiz.age} anos
Situação Profissional: ${quiz.professionalSituation}
Ponto de Partida: ${quiz.startingPoint}
Rota Determinada: ${quiz.route}

=== RESPOSTAS DA ROTA ${quiz.route} ===
${JSON.stringify(quiz.routeResponses, null, 2)}

=== AUDITORIA COMPORTAMENTAL ===
${JSON.stringify(quiz.behavioralAudit, null, 2)}

=== BIOHACKING E ENERGIA ===
${JSON.stringify(quiz.biohackingResponses, null, 2)}

=== VISÃO DE 5 ANOS ===
${JSON.stringify(quiz.vision5Years, null, 2)}

Meta Financeira 5 Anos: R$ ${quiz.financialGoal5Years || 'Não informado'}/mês
Renda Atual: R$ ${quiz.currentIncome || 'Não informado'}/mês
`;
    }

    private parseAndValidateResponse(text: string): GeneratedPlanDto {
        // Remove markdown code blocks if present
        let cleanText = text.trim();
        if (cleanText.startsWith('```json')) {
            cleanText = cleanText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (cleanText.startsWith('```')) {
            cleanText = cleanText.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }

        const parsed = JSON.parse(cleanText);

        // Validate required fields
        if (!parsed.vision_statement || !parsed.vision_5_years || !parsed.year_01_roadmap || !parsed.month_01_detail) {
            throw new Error('Missing required fields in AI response');
        }

        return parsed as GeneratedPlanDto;
    }

    // ============================================
    // FALLBACKS
    // ============================================

    private getFallbackPlan(quiz: QuizResponseDto): GeneratedPlanDto {
        const baseRevenue = quiz.currentIncome || 3000;
        const targetRevenue = quiz.financialGoal5Years || 50000;

        return {
            vision_statement: `Em 5 anos, ${quiz.name} será um(a) empreendedor(a) digital de sucesso com faturamento mensal de R$ ${targetRevenue.toLocaleString('pt-BR')}, vivendo com liberdade financeira e geográfica.`,
            vision_5_years: [
                { year: 1, phase: 'IMPLANTAÇÃO', goal: 'Validar ideia e conquistar primeiros clientes', revenue_target: Math.min(baseRevenue * 2, 10000) },
                { year: 2, phase: 'EXPANSÃO', goal: 'Escalar operação e estruturar processos', revenue_target: Math.min(baseRevenue * 5, 25000) },
                { year: 3, phase: 'MATURIDADE', goal: 'Consolidar marca e diversificar receitas', revenue_target: Math.min(baseRevenue * 10, 50000) },
                { year: 4, phase: 'GLOBALIZAÇÃO', goal: 'Expandir para novos mercados', revenue_target: Math.min(baseRevenue * 20, 100000) },
                { year: 5, phase: 'LEGADO', goal: 'Alcançar liberdade financeira total', revenue_target: targetRevenue },
            ],
            year_01_roadmap: [
                { month: 1, month_name: 'Fevereiro', objective_title: 'Definição de Nicho', objective_description: 'Validar nicho e persona ideal', status: 'unlocked' },
                { month: 2, month_name: 'Março', objective_title: 'MVP', objective_description: 'Desenvolver produto mínimo viável', status: 'locked' },
                { month: 3, month_name: 'Abril', objective_title: 'Primeiras Vendas', objective_description: 'Conquistar 10 primeiros clientes', status: 'locked' },
                { month: 4, month_name: 'Maio', objective_title: 'Validação', objective_description: 'Coletar feedback e iterar', status: 'locked' },
                { month: 5, month_name: 'Junho', objective_title: 'Otimização', objective_description: 'Melhorar conversão e retenção', status: 'locked' },
                { month: 6, month_name: 'Julho', objective_title: 'Escala Inicial', objective_description: 'Dobrar base de clientes', status: 'locked' },
                { month: 7, month_name: 'Agosto', objective_title: 'Processos', objective_description: 'Documentar e automatizar', status: 'locked' },
                { month: 8, month_name: 'Setembro', objective_title: 'Equipe', objective_description: 'Primeira contratação/terceirização', status: 'locked' },
                { month: 9, month_name: 'Outubro', objective_title: 'Marketing', objective_description: 'Dobrar investimento em aquisição', status: 'locked' },
                { month: 10, month_name: 'Novembro', objective_title: 'Produto V2', objective_description: 'Lançar versão melhorada', status: 'locked' },
                { month: 11, month_name: 'Dezembro', objective_title: 'Consolidação', objective_description: 'Fechar ano com metas batidas', status: 'locked' },
                { month: 12, month_name: 'Janeiro', objective_title: 'Planejamento Ano 2', objective_description: 'Definir estratégia do próximo ano', status: 'locked' },
            ],
            month_01_detail: this.getFallbackMonthDetail(),
        };
    }

    private getFallbackMonthDetail(): MonthDetailDto {
        return {
            focus: 'Definição de Nicho e Persona',
            weeks: [
                {
                    week_number: 1,
                    date_range: '01-07 FEV',
                    title: 'Pesquisa de Mercado',
                    description: 'Analisar concorrência e identificar oportunidades',
                    daily_tasks: [
                        { day: 1, day_name: 'Sab', tasks: [{ title: 'Listar 10 concorrentes diretos', description: 'Pesquisar e documentar principais players', category: 'Estratégia', xp_reward: 25 }] },
                        { day: 2, day_name: 'Dom', tasks: [{ title: 'Analisar pontos fortes/fracos', description: 'SWOT dos 3 principais concorrentes', category: 'Estratégia', xp_reward: 30 }] },
                        { day: 3, day_name: 'Seg', tasks: [{ title: 'Definir diferencial', description: 'Identificar proposta única de valor', category: 'Estratégia', xp_reward: 35 }] },
                        { day: 4, day_name: 'Ter', tasks: [{ title: 'Criar persona inicial', description: 'Documentar cliente ideal', category: 'Marketing', xp_reward: 25 }] },
                        { day: 5, day_name: 'Qua', tasks: [{ title: 'Validar persona', description: 'Conversar com 3 potenciais clientes', category: 'Vendas', xp_reward: 40 }] },
                        { day: 6, day_name: 'Qui', tasks: [{ title: 'Refinar proposta', description: 'Ajustar baseado em feedback', category: 'Estratégia', xp_reward: 25 }] },
                        { day: 7, day_name: 'Sex', tasks: [{ title: 'Revisão semanal', description: 'Documentar aprendizados', category: 'Operações', xp_reward: 15 }] },
                    ],
                },
                {
                    week_number: 2,
                    date_range: '08-14 FEV',
                    title: 'Validação de Oferta',
                    description: 'Testar demanda e precificação',
                    daily_tasks: [
                        { day: 8, day_name: 'Sab', tasks: [{ title: 'Criar oferta inicial', description: 'Definir produto/serviço e preço', category: 'Produto', xp_reward: 30 }] },
                        { day: 9, day_name: 'Dom', tasks: [{ title: 'Landing page simples', description: 'Criar página de captura', category: 'Marketing', xp_reward: 35 }] },
                        { day: 10, day_name: 'Seg', tasks: [{ title: 'Testar com 5 pessoas', description: 'Coletar feedback sobre oferta', category: 'Vendas', xp_reward: 40 }] },
                        { day: 11, day_name: 'Ter', tasks: [{ title: 'Ajustar precificação', description: 'Refinar baseado em objeções', category: 'Estratégia', xp_reward: 25 }] },
                        { day: 12, day_name: 'Qua', tasks: [{ title: 'Criar script de vendas', description: 'Roteiro para conversas', category: 'Vendas', xp_reward: 30 }] },
                        { day: 13, day_name: 'Qui', tasks: [{ title: 'Primeira venda de teste', description: 'Tentar fechar primeira venda', category: 'Vendas', xp_reward: 50 }] },
                        { day: 14, day_name: 'Sex', tasks: [{ title: 'Revisão semanal', description: 'Analisar resultados', category: 'Operações', xp_reward: 15 }] },
                    ],
                },
                {
                    week_number: 3,
                    date_range: '15-21 FEV',
                    title: 'Estrutura Inicial',
                    description: 'Montar fundação do negócio',
                    daily_tasks: [
                        { day: 15, day_name: 'Sab', tasks: [{ title: 'Definir stack de ferramentas', description: 'Escolher plataformas essenciais', category: 'Operações', xp_reward: 25 }] },
                        { day: 16, day_name: 'Dom', tasks: [{ title: 'Configurar CRM básico', description: 'Organizar gestão de leads', category: 'Operações', xp_reward: 30 }] },
                        { day: 17, day_name: 'Seg', tasks: [{ title: 'Criar perfis profissionais', description: 'Instagram/LinkedIn business', category: 'Marketing', xp_reward: 25 }] },
                        { day: 18, day_name: 'Ter', tasks: [{ title: 'Planejar conteúdo', description: 'Calendário de 30 dias', category: 'Marketing', xp_reward: 30 }] },
                        { day: 19, day_name: 'Qua', tasks: [{ title: 'Criar 3 conteúdos', description: 'Posts para primeira semana', category: 'Marketing', xp_reward: 35 }] },
                        { day: 20, day_name: 'Qui', tasks: [{ title: 'Definir rotina diária', description: 'Blocos de tempo para negócio', category: 'Operações', xp_reward: 20 }] },
                        { day: 21, day_name: 'Sex', tasks: [{ title: 'Revisão semanal', description: 'Ajustes e planejamento', category: 'Operações', xp_reward: 15 }] },
                    ],
                },
                {
                    week_number: 4,
                    date_range: '22-28 FEV',
                    title: 'Execução e Ajustes',
                    description: 'Colocar plano em ação',
                    daily_tasks: [
                        { day: 22, day_name: 'Sab', tasks: [{ title: 'Publicar conteúdo', description: 'Iniciar presença online', category: 'Marketing', xp_reward: 25 }] },
                        { day: 23, day_name: 'Dom', tasks: [{ title: 'Engajar com público', description: 'Responder e interagir', category: 'Marketing', xp_reward: 20 }] },
                        { day: 24, day_name: 'Seg', tasks: [{ title: 'Prospectar 10 leads', description: 'Buscar potenciais clientes', category: 'Vendas', xp_reward: 35 }] },
                        { day: 25, day_name: 'Ter', tasks: [{ title: 'Follow-up leads', description: 'Acompanhar conversas', category: 'Vendas', xp_reward: 25 }] },
                        { day: 26, day_name: 'Qua', tasks: [{ title: 'Analisar métricas', description: 'Revisar dados da semana', category: 'Estratégia', xp_reward: 25 }] },
                        { day: 27, day_name: 'Qui', tasks: [{ title: 'Ajustar estratégia', description: 'Otimizar baseado em dados', category: 'Estratégia', xp_reward: 30 }] },
                        { day: 28, day_name: 'Sex', tasks: [{ title: 'Revisão mensal', description: 'Documentar aprendizados do mês', category: 'Operações', xp_reward: 40 }] },
                    ],
                },
            ],
        };
    }

    private getFallbackAnalysis(weekData: Record<string, any>) {
        const completionRate = weekData.completionRate || 0;
        return {
            overall_assessment: completionRate >= 80
                ? 'Excelente semana! Você manteve um ótimo ritmo de execução.'
                : completionRate >= 50
                    ? 'Boa semana com espaço para melhorias. Continue focado!'
                    : 'Semana desafiadora. Vamos ajustar a estratégia para a próxima.',
            improvement_points: [
                'Mantenha foco nas tarefas prioritárias do dia',
                'Tente completar as tarefas mais difíceis pela manhã',
                'Reserve blocos de tempo sem interrupções',
            ],
            achievements: completionRate >= 80 ? ['Semana altamente produtiva', 'Consistência mantida'] : [],
            next_week_suggestions: [
                'Comece cada dia revisando suas 3 prioridades',
                'Celebre pequenas vitórias para manter motivação',
            ],
        };
    }
}
