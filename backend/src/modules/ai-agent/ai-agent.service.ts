import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class AIAgentService {
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

    async generateFiveYearPlan(quizResponses: Record<string, any>) {
        if (!this.isConfigured) {
            return this.getFallbackPlan(quizResponses);
        }

        try {
            const message = await this.anthropic.messages.create({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4096,
                temperature: 0.7,
                system: this.getSystemPrompt(),
                messages: [{
                    role: 'user',
                    content: `Crie um plano de 5 anos para um empreendedor com as seguintes características:
          ${JSON.stringify(quizResponses, null, 2)}
          
          Retorne um JSON válido com a estrutura completa do plano.`,
                }],
            });

            const content = message.content[0];
            if (content.type === 'text') {
                return JSON.parse(content.text);
            }
        } catch (error) {
            console.error('AI generation error:', error);
            return this.getFallbackPlan(quizResponses);
        }
    }

    async generateWeeklyAnalysis(weekData: Record<string, any>) {
        if (!this.isConfigured) {
            return this.getFallbackAnalysis(weekData);
        }

        try {
            const message = await this.anthropic.messages.create({
                model: 'claude-sonnet-4-20250514',
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
            console.error('AI analysis error:', error);
            return this.getFallbackAnalysis(weekData);
        }
    }

    private getSystemPrompt(): string {
        return `Você é um consultor de negócios especializado em planejamento estratégico de 5 anos para empreendedores digitais.
    
    Sua tarefa é analisar as respostas do quiz inicial do usuário e gerar um plano de 5 anos detalhado, estruturado e acionável.
    
    O plano deve incluir:
    1. Visão de 5 anos clara e inspiradora
    2. Meta financeira principal e marcos intermediários
    3. 5 objetivos anuais progressivos
    4. Breakdown mensal para o primeiro ano
    5. Semanas detalhadas com tarefas diárias para o primeiro mês
    
    IMPORTANTE: Retorne APENAS um objeto JSON válido, sem markdown, sem explicações adicionais.`;
    }

    private getFallbackPlan(quizResponses: Record<string, any>) {
        return {
            vision_statement: `Em 5 anos, você será um empreendedor digital de sucesso com renda mensal de R$ ${quizResponses.financialGoal5Years || 50000}`,
            yearly_goals: [
                { year: 1, title: 'Fundação e Validação', revenue_target: 5000 },
                { year: 2, title: 'Crescimento Inicial', revenue_target: 15000 },
                { year: 3, title: 'Escala', revenue_target: 30000 },
                { year: 4, title: 'Consolidação', revenue_target: 40000 },
                { year: 5, title: 'Liderança de Mercado', revenue_target: quizResponses.financialGoal5Years || 50000 },
            ],
            message: 'Plano básico gerado. Configure a API Anthropic para planos personalizados.',
        };
    }

    private getFallbackAnalysis(weekData: Record<string, any>) {
        const completionRate = weekData.completionRate || 0;
        return {
            overall_assessment: completionRate >= 80
                ? 'Excelente semana! Você manteve um ótimo ritmo.'
                : 'Semana com oportunidades de melhoria.',
            improvement_points: ['Mantenha foco nas tarefas prioritárias', 'Tente manter consistência diária'],
            achievements: completionRate >= 80 ? ['Semana produtiva'] : [],
            next_week_suggestions: ['Comece o dia com a tarefa mais importante'],
        };
    }
}
