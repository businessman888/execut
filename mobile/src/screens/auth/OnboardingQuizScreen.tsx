import React, { useState } from 'react';
import { Box, VStack, ScrollView, Text, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { QuizHeader, QuizProgressIndicator, QuizContainer, QuizInput, AgePicker, QuizRadioGroup, HoursSlider, FeatureShowcase, BalanceSlider } from '../../components/quiz';

// Quiz step definitions
const QUIZ_STEPS = [
    {
        id: 'name',
        titleLines: [
            { text: 'Antes de traçarmos', color: 'primary' as const },
            { text: 'seu plano:', color: 'accent' as const },
            { text: 'Como devemos te chamar?', color: 'primary' as const },
        ],
        type: 'text',
        placeholder: 'Digite seu nome ou codinome...',
    },
    {
        id: 'age',
        titleLines: [
            { text: 'Quantos anos você', color: 'primary' as const },
            { text: 'tem hoje?', color: 'primary' as const },
        ],
        type: 'age',
    },
    {
        id: 'startingPoint',
        titleLines: [
            { text: 'Sendo bem direto:', color: 'primary' as const },
            { text: 'você está hoje em qual', color: 'primary' as const },
            { text: 'dessas situações?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'lost', label: 'Me sinto perdido', description: 'Sigo gurus, vejo vídeos, mas ando em círculos', icon: 'helpCircle' as const },
            { value: 'no_execution', label: 'Tenho ideias mas nunca executo', description: 'Começo e desisto. Preciso de estrutura', icon: 'close' as const },
            { value: 'chaos', label: 'Já tenho algo rodando', description: 'Mas minha vida é um caos, sem tração real', icon: 'pulse' as const },
            { value: 'slave', label: 'Sou escravo do negócio', description: 'Funciona, mas não consigo escalar', icon: 'flame' as const },
        ],
    },
    // ==================== ROTA A: RESGATE DE CLAREZA ====================
    // Para quem está perdido/no zero (opções: 'lost' ou 'no_execution' na etapa startingPoint)
    {
        id: 'mainBlock',
        route: 'A',
        titleLines: [
            { text: 'O que mais te', color: 'primary' as const },
            { text: 'trava', color: 'accent' as const },
            { text: 'hoje?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'no_money', label: 'Falta de dinheiro', description: 'Não tenho capital para investir em nada', icon: 'wallet' as const },
            { value: 'no_method', label: 'Falta de um método claro', description: 'Não mais promessas de guru', icon: 'map' as const },
            { value: 'fear_quit', label: 'Medo de começar e desistir', description: 'De novo...', icon: 'close' as const },
            { value: 'no_direction', label: 'Não sei por onde começar', description: 'Nem o que vender/fazer', icon: 'helpCircle' as const },
            { value: 'fear_incapable', label: 'Medo de não ser capaz', description: 'Descobrir que não sou bom o suficiente', icon: 'alert' as const },
        ],
    },
    {
        id: 'consumptionTrap',
        route: 'A',
        titleLines: [
            { text: 'Seja honesto: quanto tempo', color: 'primary' as const },
            { text: 'você gasta vendo "soluções', color: 'primary' as const },
            { text: 'mágicas"', color: 'accent' as const },
            { text: 'em vez de CONSTRUIR?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'less_30min', label: 'Menos de 30 minutos', description: 'Sou bem focado nisso', icon: 'checkmarkDone' as const },
            { value: '30min_1h', label: 'Entre 30 min e 1 hora', description: 'Por dia', icon: 'time' as const },
            { value: '1h_2h', label: 'Entre 1 e 2 horas', description: 'Diárias no "modo busca"', icon: 'search' as const },
            { value: '2h_4h', label: 'Entre 2 e 4 horas', description: 'Sei que é muito', icon: 'warning' as const },
            { value: 'more_4h', label: 'Mais de 4 horas', description: 'Basicamente meu dia inteiro', icon: 'alert' as const },
        ],
    },
    {
        id: 'failureProjection',
        route: 'A',
        titleLines: [
            { text: 'Se você continuar como', color: 'primary' as const },
            { text: 'está, onde estará', color: 'primary' as const },
            { text: 'daqui a 1 ano?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'same_place', label: 'No mesmo lugar', description: 'Provavelmente mais frustrado', icon: 'reload' as const },
            { value: 'worse', label: 'Pior do que agora', description: 'Financeira ou emocionalmente', icon: 'trendingDown' as const },
            { value: 'small_improvements', label: 'Pequenas melhorias', description: 'Mas nada significativo', icon: 'remove' as const },
            { value: 'no_idea', label: 'Não faço ideia', description: 'Mas sei que não é onde quero', icon: 'helpCircle' as const },
            { value: 'avoid_thinking', label: 'Prefiro nem pensar', description: 'Porque dói demais', icon: 'eyeOff' as const },
        ],
    },
    {
        id: 'directionClarity',
        route: 'A',
        titleLines: [
            { text: 'Você já sabe o que quer', color: 'primary' as const },
            { text: 'fazer/vender', color: 'accent' as const },
            { text: 'ou espera uma "luz"?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'know_exactly', label: 'Já sei exatamente', description: 'Só preciso de estrutura', icon: 'checkmarkDone' as const },
            { value: 'few_ideas', label: 'Tenho 2-3 ideias', description: 'Mas não sei qual escolher', icon: 'git-branch' as const },
            { value: 'vague_notion', label: 'Tenho uma vaga noção', description: 'Mas nada definido', icon: 'cloudy' as const },
            { value: 'completely_lost', label: 'Não faço ideia', description: 'Estou completamente perdido', icon: 'helpCircle' as const },
            { value: 'tried_failed', label: 'Já tentei várias coisas', description: 'Nada deu certo', icon: 'close' as const },
        ],
    },
    {
        id: 'realAvailability',
        route: 'A',
        titleLines: [
            { text: 'Quanto tempo por dia você', color: 'primary' as const },
            { text: 'pode dedicar', color: 'accent' as const },
            { text: 'à mudança de vida?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'less_1h', label: 'Menos de 1 hora', description: 'Tenho muitos compromissos', icon: 'time' as const },
            { value: '1h_2h', label: 'Entre 1 e 2 horas', description: 'Por dia', icon: 'time' as const },
            { value: '2h_4h', label: 'Entre 2 e 4 horas', description: 'Por dia', icon: 'time' as const },
            { value: '4h_6h', label: 'Entre 4 e 6 horas', description: 'Por dia', icon: 'time' as const },
            { value: 'more_6h', label: 'Mais de 6 horas', description: 'Posso me dedicar full time', icon: 'rocket' as const },
        ],
    },
    {
        id: 'initialCapital',
        route: 'A',
        titleLines: [
            { text: 'Quanto dinheiro você tem', color: 'primary' as const },
            { text: 'HOJE', color: 'accent' as const },
            { text: 'para investir?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'zero', label: 'Zero ou endividado', description: 'Sem capital disponível', icon: 'wallet' as const },
            { value: '100_500', label: 'Entre R$ 100 e R$ 500', description: 'Capital limitado', icon: 'wallet' as const },
            { value: '500_2000', label: 'Entre R$ 500 e R$ 2.000', description: 'Algum capital', icon: 'wallet' as const },
            { value: '2000_5000', label: 'Entre R$ 2.000 e R$ 5.000', description: 'Capital razoável', icon: 'wallet' as const },
            { value: 'more_5000', label: 'Mais de R$ 5.000', description: 'Capital disponível', icon: 'cash' as const },
        ],
    },
    {
        id: 'naturalSkills',
        route: 'A',
        titleLines: [
            { text: 'No que você é', color: 'primary' as const },
            { text: 'naturalmente bom?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'sales', label: 'Vendas e comunicação', description: 'Convencer pessoas, falar bem', icon: 'megaphone' as const },
            { value: 'logic', label: 'Lógica e análise', description: 'Números, estratégia, processos', icon: 'analytics' as const },
            { value: 'creativity', label: 'Criatividade', description: 'Escrita, design, ideias, conteúdo', icon: 'colorPalette' as const },
            { value: 'execution', label: 'Organização e execução', description: 'Colocar as coisas em prática', icon: 'checkmarkDone' as const },
            { value: 'nothing_specific', label: 'Não me vejo bom em nada', description: 'Nada específico', icon: 'helpCircle' as const },
        ],
    },
    {
        id: 'changeFuel',
        route: 'A',
        titleLines: [
            { text: 'O que é mais', color: 'primary' as const },
            { text: 'insuportável', color: 'accent' as const },
            { text: 'na sua vida hoje?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'financial', label: 'Situação financeira', description: 'Contas, dívidas, dependência', icon: 'wallet' as const },
            { value: 'wasting_potential', label: 'Desperdiçar meu potencial', description: 'Sensação de estar estagnado', icon: 'flame' as const },
            { value: 'others_winning', label: 'Ver outros conquistando', description: 'Enquanto eu fico parado', icon: 'people' as const },
            { value: 'shame', label: 'Vergonha', description: 'De não ter construído nada', icon: 'eyeOff' as const },
            { value: 'fear_age', label: 'Medo do futuro', description: 'Chegar aos 40/50 sem realizar', icon: 'alert' as const },
        ],
    },
    // ==================== ROTA B: ALINHAMENTO DE PERFORMANCE ====================
    // Para quem já empreende (opções: 'chaos' ou 'slave' na etapa startingPoint)
    {
        id: 'independenceTest',
        route: 'B',
        titleLines: [
            { text: 'Se você parar de trabalhar', color: 'primary' as const },
            { text: 'por 15 dias', color: 'accent' as const },
            { text: 'seu negócio:', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'works_perfectly', label: 'Continua funcionando', description: 'Perfeitamente sem mim', icon: 'checkmarkDone' as const },
            { value: 'works_drops', label: 'Funciona mas com quedas', description: 'Queda perceptível de performance', icon: 'trendingDown' as const },
            { value: 'survives', label: 'Sobrevive', description: 'Mas clientes reclamam ou saem', icon: 'warning' as const },
            { value: 'stops', label: 'Para completamente', description: 'Depende 100% de mim', icon: 'alert' as const },
            { value: 'disaster', label: 'Seria um desastre', description: 'Nem penso nisso', icon: 'flame' as const },
        ],
    },
    {
        id: 'elephantInRoom',
        route: 'B',
        titleLines: [
            { text: 'Qual problema você está', color: 'primary' as const },
            { text: 'EVITANDO', color: 'accent' as const },
            { text: 'resolver no negócio?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'delegation', label: 'Preciso delegar', description: 'Mas tenho medo de perder controle', icon: 'people' as const },
            { value: 'not_scalable', label: 'Produto não escalável', description: 'Não consigo crescer', icon: 'trendingDown' as const },
            { value: 'no_processes', label: 'Sem processos definidos', description: 'Tudo é "na intuição"', icon: 'construct' as const },
            { value: 'leaving_money', label: 'Deixando dinheiro na mesa', description: 'Falta estratégia de vendas', icon: 'cash' as const },
            { value: 'health_compromised', label: 'Saúde comprometida', description: 'Mental/física pelo ritmo', icon: 'alert' as const },
        ],
    },
    {
        id: 'businessIdentity',
        route: 'B',
        titleLines: [
            { text: 'Como você se sente', color: 'primary' as const },
            { text: 'no dia a dia?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'entrepreneur', label: 'Empresário com visão', description: 'Lidero um projeto estratégico', icon: 'rocket' as const },
            { value: 'firefighter', label: 'Faz-tudo apagando incêndios', description: 'O dia inteiro', icon: 'flame' as const },
            { value: 'glorified_freelancer', label: 'Freelancer glorificado', description: 'Não me sinto dono', icon: 'person' as const },
            { value: 'oscillating', label: 'Oscilo entre controle e caos', description: 'Totalmente sobrecarregado', icon: 'pulse' as const },
            { value: 'exhausted', label: 'Exausto', description: 'Trabalho 12h+ sem progresso', icon: 'alert' as const },
        ],
    },
    {
        id: 'magicNumber',
        route: 'B',
        titleLines: [
            { text: 'Qual faturamento mensal', color: 'primary' as const },
            { text: 'mudaria seu jogo', color: 'accent' as const },
            { text: 'nos próximos 12 meses?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: '5k_10k', label: 'R$ 5.000 - R$ 10.000/mês', description: 'Estabilidade inicial', icon: 'cash' as const },
            { value: '10k_30k', label: 'R$ 10.000 - R$ 30.000/mês', description: 'Crescimento consistente', icon: 'cash' as const },
            { value: '30k_50k', label: 'R$ 30.000 - R$ 50.000/mês', description: 'Escala moderada', icon: 'cash' as const },
            { value: '50k_100k', label: 'R$ 50.000 - R$ 100.000/mês', description: 'Alto crescimento', icon: 'cash' as const },
            { value: 'more_100k', label: 'Mais de R$ 100.000/mês', description: 'Escala agressiva', icon: 'rocket' as const },
        ],
    },
    {
        id: 'currentRevenue',
        route: 'B',
        titleLines: [
            { text: 'Qual sua média de', color: 'primary' as const },
            { text: 'faturamento mensal', color: 'accent' as const },
            { text: 'REAL hoje?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: '0_3k', label: 'R$ 0 - R$ 3.000', description: 'Início de operação', icon: 'wallet' as const },
            { value: '3k_10k', label: 'R$ 3.000 - R$ 10.000', description: 'Operação pequena', icon: 'wallet' as const },
            { value: '10k_30k', label: 'R$ 10.000 - R$ 30.000', description: 'Operação média', icon: 'cash' as const },
            { value: '30k_100k', label: 'R$ 30.000 - R$ 100.000', description: 'Operação grande', icon: 'cash' as const },
            { value: 'more_100k', label: 'Mais de R$ 100.000', description: 'Alta escala', icon: 'rocket' as const },
        ],
    },
    {
        id: 'mainBottleneck',
        route: 'B',
        titleLines: [
            { text: 'O que impede seu negócio', color: 'primary' as const },
            { text: 'de dobrar', color: 'accent' as const },
            { text: 'de tamanho HOJE?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'no_processes', label: 'Falta de processos', description: 'Sistemas não claros', icon: 'construct' as const },
            { value: 'no_traffic', label: 'Falta de tráfego/clientes', description: 'Marketing/vendas', icon: 'megaphone' as const },
            { value: 'not_scalable', label: 'Produto não escalável', description: 'Limite de crescimento', icon: 'trendingDown' as const },
            { value: 'no_focus', label: 'Falta de foco', description: 'Muita coisa ao mesmo tempo', icon: 'pulse' as const },
            { value: 'no_team', label: 'Falta de equipe', description: 'Pessoas certas', icon: 'people' as const },
        ],
    },
    {
        id: 'teamStructure',
        route: 'B',
        titleLines: [
            { text: 'Como você', color: 'primary' as const },
            { text: 'opera', color: 'accent' as const },
            { text: 'hoje?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'solo', label: 'Sozinho (solopreneur)', description: 'Faço absolutamente tudo', icon: 'person' as const },
            { value: 'solo_outsource', label: 'Sozinho + terceirizo', description: 'Algumas tarefas pontuais', icon: 'person' as const },
            { value: 'small_help', label: '1-2 pessoas me ajudando', description: 'Freelancers/parceiros', icon: 'people' as const },
            { value: 'small_team', label: 'Pequena equipe (3-5)', description: 'Estrutura inicial', icon: 'people' as const },
            { value: 'structured_team', label: 'Equipe estruturada (6+)', description: 'Time completo', icon: 'people' as const },
        ],
    },
    {
        id: 'strategicAlignment',
        route: 'B',
        titleLines: [
            { text: 'Seu negócio atual é capaz', color: 'primary' as const },
            { text: 'de te levar ao objetivo', color: 'primary' as const },
            { text: 'de 5 anos?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'yes_totally', label: 'Sim, totalmente', description: 'Só preciso organizar melhor', icon: 'checkmarkDone' as const },
            { value: 'yes_adjustments', label: 'Sim, com ajustes', description: 'Preciso fazer mudanças significativas', icon: 'construct' as const },
            { value: 'partially', label: 'Parcialmente', description: 'Preciso pivotar ou adicionar frentes', icon: 'git-branch' as const },
            { value: 'wrong_business', label: 'Não, negócio errado', description: 'Mas com medo de mudar', icon: 'warning' as const },
            { value: 'no_clarity', label: 'Não sei responder', description: 'Sem clareza do objetivo', icon: 'helpCircle' as const },
        ],
    },
    // ==================== INTERSEÇÃO: FASE 3 - AUDITORIA COMPORTAMENTAL ====================
    // A partir daqui as perguntas são as mesmas para ambas as rotas (A e B)
    {
        id: 'personalIntegrity',
        route: 'common',
        titleLines: [
            { text: 'Quantas vezes na última', color: 'primary' as const },
            { text: 'semana', color: 'accent' as const },
            { text: 'você disse que ia fazer', color: 'primary' as const },
            { text: 'algo e não fez?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'none', label: 'Nenhuma', description: 'Quando digo, faço', icon: 'checkmarkDone' as const },
            { value: '1_2_times', label: '1-2 vezes', description: 'Sou relativamente consistente', icon: 'checkmark' as const },
            { value: '3_5_times', label: '3-5 vezes', description: 'Procrastino mais do que gostaria', icon: 'time' as const },
            { value: 'almost_daily', label: 'Quase todos os dias', description: 'Tenho dificuldade com compromissos', icon: 'warning' as const },
            { value: 'lost_count', label: 'Perdi a conta', description: 'Minha palavra não tem valor', icon: 'alert' as const },
        ],
    },
    {
        id: 'screenTime',
        route: 'common',
        titleLines: [
            { text: 'Quantas horas por dia em', color: 'primary' as const },
            { text: 'redes sociais', color: 'accent' as const },
            { text: 'que NÃO são para trabalho?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'less_30min', label: 'Menos de 30 minutos', description: 'Controle total', icon: 'checkmarkDone' as const },
            { value: '30min_1h', label: 'Entre 30 min e 1 hora', description: 'Uso moderado', icon: 'time' as const },
            { value: '1h_2h', label: 'Entre 1 e 2 horas', description: 'Uso considerável', icon: 'time' as const },
            { value: '2h_4h', label: 'Entre 2 e 4 horas', description: 'Uso elevado', icon: 'warning' as const },
            { value: 'more_4h', label: 'Mais de 4 horas', description: 'É um vício real', icon: 'alert' as const },
        ],
    },
    {
        id: 'abandonmentRate',
        route: 'common',
        titleLines: [
            { text: 'De 0 a 10, quanto você', color: 'primary' as const },
            { text: 'abandona projetos', color: 'accent' as const },
            { text: 'quando fica difícil?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: '0_2', label: '0-2 (Raramente abandono)', description: 'Sou persistente', icon: 'checkmarkDone' as const },
            { value: '3_4', label: '3-4 (Às vezes abandono)', description: 'Mas não é frequente', icon: 'checkmark' as const },
            { value: '5_6', label: '5-6 (Regularidade moderada)', description: 'Abandono às vezes', icon: 'time' as const },
            { value: '7_8', label: '7-8 (Abandono frequente)', description: 'Quando fica difícil', icon: 'warning' as const },
            { value: '9_10', label: '9-10 (Quase sempre)', description: 'Histórico extenso', icon: 'alert' as const },
        ],
    },
    {
        id: 'focusCapacity',
        route: 'common',
        titleLines: [
            { text: 'Consegue trabalhar 90 min', color: 'primary' as const },
            { text: 'sem checar celular', color: 'accent' as const },
            { text: 'ou abrir outra aba?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'easily', label: 'Sim, facilmente', description: 'Tenho foco profundo', icon: 'checkmarkDone' as const },
            { value: 'with_effort', label: 'Sim, com esforço', description: 'Preciso de esforço consciente', icon: 'checkmark' as const },
            { value: 'sometimes', label: 'Às vezes', description: 'Depende da tarefa', icon: 'time' as const },
            { value: 'rarely', label: 'Raramente', description: 'Minha mente dispersa rápido', icon: 'warning' as const },
            { value: 'never', label: 'Nunca', description: 'Sempre multitarefas', icon: 'alert' as const },
        ],
    },
    {
        id: 'procrastinationRoot',
        route: 'common',
        titleLines: [
            { text: 'Você procrastina', color: 'primary' as const },
            { text: 'porque:', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'difficult', label: 'Tarefa difícil/desconfortável', description: 'É genuinamente difícil', icon: 'construct' as const },
            { value: 'fear_fail', label: 'Medo de falhar', description: 'Descobrir que não sou bom', icon: 'alert' as const },
            { value: 'no_result', label: 'Não vejo resultado imediato', description: 'Perco a motivação', icon: 'trendingDown' as const },
            { value: 'tired', label: 'Sempre cansado', description: 'Sem energia mental', icon: 'warning' as const },
            { value: 'unknown', label: 'Não sei', description: 'Simplesmente acontece', icon: 'helpCircle' as const },
        ],
    },
    {
        id: 'realAmbition',
        route: 'common',
        titleLines: [
            { text: 'De 1 a 10, qual seu', color: 'primary' as const },
            { text: 'nível de ambição?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: '1_3', label: '1-3 (Sem sacrifícios extremos)', description: 'Quero melhorar com equilíbrio', icon: 'checkmark' as const },
            { value: '4_5', label: '4-5 (Ambição moderada)', description: 'Equilíbrio importa', icon: 'checkmark' as const },
            { value: '6_7', label: '6-7 (Ambição forte)', description: 'Aceito sacrifícios calculados', icon: 'flame' as const },
            { value: '8_9', label: '8-9 (Disposto a sacrificar)', description: 'Muito pelos objetivos', icon: 'flame' as const },
            { value: '10', label: '10 (Modo obsessivo)', description: 'Sucesso acima de tudo', icon: 'rocket' as const },
        ],
    },
    // ==================== FASE 4: BIOHACKING E ENERGIA ====================
    {
        id: 'energyLevel',
        route: 'common',
        titleLines: [
            { text: 'Como está seu nível de', color: 'primary' as const },
            { text: 'energia às 15h?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'high', label: 'Alto', description: 'Continuo produtivo e focado', icon: 'rocket' as const },
            { value: 'good', label: 'Bom', description: 'Produtivo mas com leve queda', icon: 'checkmarkDone' as const },
            { value: 'medium', label: 'Médio', description: 'Preciso de cafeína ou pausa', icon: 'time' as const },
            { value: 'low', label: 'Baixo', description: 'Arrastando os pés', icon: 'warning' as const },
            { value: 'terrible', label: 'Péssimo', description: 'Zumbi depois do almoço', icon: 'alert' as const },
        ],
    },
    {
        id: 'sleepQuality',
        route: 'common',
        titleLines: [
            { text: 'Quantas horas você dorme', color: 'primary' as const },
            { text: 'e como acorda?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: '7_9h_high', label: '7-9h + energia 8-10', description: 'Revigorado', icon: 'checkmarkDone' as const },
            { value: '6_7h_good', label: '6-7h + energia 6-7', description: 'Razoável', icon: 'checkmark' as const },
            { value: '5_6h_tired', label: '5-6h + energia 4-5', description: 'Cansado', icon: 'time' as const },
            { value: 'less_5h', label: 'Menos de 5h + energia 2-3', description: 'Exausto', icon: 'warning' as const },
            { value: 'irregular', label: 'Sono irregular', description: 'Sempre cansado', icon: 'alert' as const },
        ],
    },
    {
        id: 'sunExposure',
        route: 'common',
        titleLines: [
            { text: 'Você se expõe ao sol', color: 'primary' as const },
            { text: 'diariamente', color: 'accent' as const },
            { text: 'por pelo menos 15 min?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'daily', label: 'Sim, diariamente', description: 'De forma consciente', icon: 'checkmarkDone' as const },
            { value: 'sometimes', label: 'Sim, mas não todos os dias', description: 'Quando possível', icon: 'checkmark' as const },
            { value: 'rarely', label: 'Raramente', description: 'Passo o dia em ambientes fechados', icon: 'time' as const },
            { value: 'never', label: 'Nunca', description: 'Não penso nisso', icon: 'warning' as const },
            { value: 'no_connection', label: 'Não vejo conexão', description: 'O que tem a ver com objetivos?', icon: 'helpCircle' as const },
        ],
    },
    {
        id: 'physicalActivity',
        route: 'common',
        titleLines: [
            { text: 'Pratica exercícios de', color: 'primary' as const },
            { text: 'força/resistência', color: 'accent' as const },
            { text: 'regularmente?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: '4_plus', label: 'Sim, 4+ vezes/semana', description: 'Consistente', icon: 'checkmarkDone' as const },
            { value: '2_3', label: 'Sim, 2-3 vezes/semana', description: 'Regular', icon: 'checkmark' as const },
            { value: '1_irregular', label: 'Às vezes, 1x/semana', description: 'Irregular', icon: 'time' as const },
            { value: 'rarely', label: 'Raramente', description: 'Sem rotina de exercícios', icon: 'warning' as const },
            { value: 'sedentary', label: 'Não pratico', description: 'Sedentário', icon: 'alert' as const },
        ],
    },
    {
        id: 'dopamineVices',
        route: 'common',
        titleLines: [
            { text: 'Você consome regularmente:', color: 'primary' as const },
            { text: 'fast-food, cafeína excessiva,', color: 'primary' as const },
            { text: 'álcool frequente?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'none', label: 'Nenhum desses', description: 'Tenho controle', icon: 'checkmarkDone' as const },
            { value: 'one', label: 'Um ocasionalmente', description: '1-2x por semana', icon: 'checkmark' as const },
            { value: 'two', label: 'Dois com frequência', description: 'Uso moderado', icon: 'time' as const },
            { value: 'three', label: 'Três de forma regular', description: 'Preciso melhorar', icon: 'warning' as const },
            { value: 'all', label: 'Todos ou quase todos', description: 'Sei que afeta meu desempenho', icon: 'alert' as const },
        ],
    },
    {
        id: 'bodyCare',
        route: 'common',
        titleLines: [
            { text: 'Cuida do seu corpo como', color: 'primary' as const },
            { text: 'ferramenta principal', color: 'accent' as const },
            { text: 'do seu sucesso?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'priority', label: 'Sim, é prioridade', description: 'Sono, alimentação e exercício', icon: 'checkmarkDone' as const },
            { value: 'try', label: 'Tento, mas às vezes falho', description: 'Negligencio sob pressão', icon: 'checkmark' as const },
            { value: 'when_bad', label: 'Só quando estou mal', description: 'Cuido quando preciso', icon: 'time' as const },
            { value: 'no_time', label: 'Não tenho tempo', description: 'Muita coisa para fazer', icon: 'warning' as const },
            { value: 'should', label: 'Sei que deveria', description: 'Mas simplesmente não cuido', icon: 'alert' as const },
        ],
    },
    {
        id: 'mentalState',
        route: 'common',
        titleLines: [
            { text: 'Sua mente é:', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'calm', label: 'Calma e focada', description: 'Tomo decisões com clareza', icon: 'checkmarkDone' as const },
            { value: 'organized', label: 'Geralmente organizada', description: 'Às vezes acelerada', icon: 'checkmark' as const },
            { value: 'anxious', label: 'Frequentemente ansiosa', description: 'Mas consigo funcionar', icon: 'time' as const },
            { value: 'chaotic', label: 'Caótica', description: 'Pensamentos acelerados e ansiedade', icon: 'warning' as const },
            { value: 'burnout', label: 'No limite', description: 'Burnout ou próximo disso', icon: 'alert' as const },
        ],
    },
    // ==================== FASE 5: VISÃO DE 5 ANOS ====================
    {
        id: 'arrivalMoment',
        route: 'common',
        titleLines: [
            { text: 'Daqui a 5 anos, onde você', color: 'primary' as const },
            { text: 'quer estar', color: 'accent' as const },
            { text: 'acordando?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'high_standard', label: 'Casa de alto padrão', description: 'Vista privilegiada, liberdade total', icon: 'rocket' as const },
            { value: 'comfortable', label: 'Casa confortável', description: 'Vida estável e sem dívidas', icon: 'checkmarkDone' as const },
            { value: 'nomad', label: 'Viajando o mundo', description: 'Estilo nômade digital', icon: 'globe' as const },
            { value: 'same_free', label: 'No mesmo lugar', description: 'Mas com liberdade financeira', icon: 'checkmark' as const },
            { value: 'unclear', label: 'Ainda não consigo visualizar', description: 'Falta clareza', icon: 'helpCircle' as const },
        ],
    },
    {
        id: 'netWorthTarget',
        route: 'common',
        titleLines: [
            { text: 'Em 5 anos, qual patrimônio', color: 'primary' as const },
            { text: 'líquido', color: 'accent' as const },
            { text: 'você quer ter?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: '100k_500k', label: 'R$ 100 mil a R$ 500 mil', description: 'Patrimônio inicial', icon: 'cash' as const },
            { value: '500k_1m', label: 'R$ 500 mil a R$ 1 milhão', description: 'Patrimônio sólido', icon: 'cash' as const },
            { value: '1m_3m', label: 'R$ 1 milhão a R$ 3 milhões', description: 'Alta escala', icon: 'cash' as const },
            { value: '3m_10m', label: 'R$ 3 milhões a R$ 10 milhões', description: 'Muito alta escala', icon: 'rocket' as const },
            { value: 'more_10m', label: 'Mais de R$ 10 milhões', description: 'Escala extrema', icon: 'rocket' as const },
        ],
    },
    {
        id: 'incomeTarget',
        route: 'common',
        titleLines: [
            { text: 'Qual renda mensal você', color: 'primary' as const },
            { text: 'quer ter', color: 'accent' as const },
            { text: 'daqui a 5 anos?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: '10k_20k', label: 'R$ 10 mil a R$ 20 mil/mês', description: 'Renda confortável', icon: 'cash' as const },
            { value: '20k_50k', label: 'R$ 20 mil a R$ 50 mil/mês', description: 'Renda alta', icon: 'cash' as const },
            { value: '50k_100k', label: 'R$ 50 mil a R$ 100 mil/mês', description: 'Renda muito alta', icon: 'cash' as const },
            { value: '100k_300k', label: 'R$ 100 mil a R$ 300 mil/mês', description: 'Renda excepcional', icon: 'rocket' as const },
            { value: 'more_300k', label: 'Mais de R$ 300 mil/mês', description: 'Top tier', icon: 'rocket' as const },
        ],
    },
    {
        id: 'killerHabit',
        route: 'common',
        titleLines: [
            { text: 'Qual hábito você precisa', color: 'primary' as const },
            { text: 'EXTERMINAR', color: 'accent' as const },
            { text: 'da sua vida hoje?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'procrastination', label: 'Procrastinação', description: 'E falta de disciplina', icon: 'hourglass' as const },
            { value: 'entertainment', label: 'Consumo excessivo', description: 'Entretenimento/redes sociais', icon: 'phonePortrait' as const },
            { value: 'fear', label: 'Medo de agir', description: 'Buscar validação externa', icon: 'alert' as const },
            { value: 'no_focus', label: 'Falta de foco', description: 'Muita coisa ao mesmo tempo', icon: 'pulse' as const },
            { value: 'vices', label: 'Vícios', description: 'Dopamina fácil', icon: 'flame' as const },
        ],
    },
    {
        id: 'planSpeed',
        route: 'common',
        titleLines: [
            { text: 'Você prefere:', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'safe', label: 'Plano seguro e gradual', description: 'Risco mínimo (mais lento)', icon: 'checkmark' as const },
            { value: 'balanced', label: 'Plano equilibrado', description: 'Crescimento sustentável', icon: 'checkmarkDone' as const },
            { value: 'aggressive', label: 'Plano agressivo', description: 'Exige 100% da capacidade', icon: 'flame' as const },
            { value: 'ultra_aggressive', label: 'Plano ultra-agressivo', description: 'Disposto a arriscar tudo', icon: 'rocket' as const },
            { value: 'fastest', label: 'O mais rápido possível', description: 'Não importa o que custar', icon: 'rocket' as const },
        ],
    },
];

export function OnboardingQuizScreen() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});

    // Determine which route the user should follow based on startingPoint answer
    const getUserRoute = (): 'A' | 'B' | null => {
        const startingPointAnswer = answers['startingPoint'];
        if (!startingPointAnswer) return null;

        // Route A: lost or no_execution
        if (startingPointAnswer === 'lost' || startingPointAnswer === 'no_execution') {
            return 'A';
        }
        // Route B: chaos or slave
        if (startingPointAnswer === 'chaos' || startingPointAnswer === 'slave') {
            return 'B';
        }
        return null;
    };

    // Filter steps based on selected route
    const getFilteredSteps = () => {
        const userRoute = getUserRoute();

        return QUIZ_STEPS.filter((step: any) => {
            // Steps without route property are always included (common steps)
            if (!step.route) return true;

            // Include common intersection steps
            if (step.route === 'common') return true;

            // If no route selected yet, include only non-route steps
            if (!userRoute) return !step.route || step.route === 'common';

            // Include steps that match the user's route
            return step.route === userRoute;
        });
    };

    const filteredSteps = getFilteredSteps();
    const step = filteredSteps[currentStepIndex];
    const totalSteps = filteredSteps.length;

    // Calculate XP earned (5 XP per completed step)
    const earnedXP = currentStepIndex * 5 + 50; // Base 50 XP + 5 per step

    const handleAnswer = (value: any) => {
        setAnswers((prev) => ({ ...prev, [step.id]: value }));
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const handleContinue = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            // Quiz completed - submit answers
            console.log('Quiz completed:', answers);
            console.log('User Route:', getUserRoute());
            // TODO: Navigate to next screen (auth or home)
        }
    };

    const isCurrentAnswerValid = () => {
        // Age picker, hours slider, feature showcase and balance slider have default values, so they're always valid
        if (step.type === 'age' || step.type === 'hoursSlider' || step.type === 'featureShowcase' || step.type === 'balanceSlider') return true;

        const answer = answers[step.id];
        if (!answer) return false;
        if (typeof answer === 'string' && answer.trim() === '') return false;
        return true;
    };

    const renderStepContent = () => {
        switch (step.type) {
            case 'text':
                return (
                    <QuizInput
                        value={answers[step.id] || ''}
                        onChangeText={handleAnswer}
                        placeholder={step.placeholder}
                    />
                );
            case 'number':
                return (
                    <QuizInput
                        value={answers[step.id]?.toString() || ''}
                        onChangeText={(val) => handleAnswer(val)}
                        placeholder={step.placeholder}
                    />
                );
            case 'radio':
                return (
                    <VStack space={2}>
                        {step.options?.map((option) => {
                            const isSelected = answers[step.id] === option.value;
                            return (
                                <Pressable
                                    key={option.value}
                                    onPress={() => handleAnswer(option.value)}
                                >
                                    <Box
                                        bg={isSelected ? 'surface.secondary' : 'transparent'}
                                        borderWidth={1}
                                        borderColor={isSelected ? 'accent.400' : 'border.default'}
                                        borderRadius={12}
                                        px={4}
                                        py={3}
                                    >
                                        <Box
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* Radio circle */}
                                            <Box
                                                w={20}
                                                h={20}
                                                borderRadius={10}
                                                borderWidth={2}
                                                borderColor={isSelected ? 'accent.400' : 'border.default'}
                                                alignItems="center"
                                                justifyContent="center"
                                                mr={3}
                                            >
                                                {isSelected && (
                                                    <Box
                                                        w={10}
                                                        h={10}
                                                        borderRadius={5}
                                                        bg="accent.400"
                                                    />
                                                )}
                                            </Box>
                                            {/* Option label */}
                                            <Text
                                                color={isSelected ? 'accent.400' : 'text.primary'}
                                                fontSize="md"
                                            >
                                                {option.label}
                                            </Text>
                                        </Box>
                                    </Box>
                                </Pressable>
                            );
                        })}
                    </VStack>
                );
            case 'radioGroup':
                return (
                    <QuizRadioGroup
                        options={step.options as any}
                        value={answers[step.id]}
                        onChange={handleAnswer}
                    />
                );
            case 'age':
                return (
                    <AgePicker
                        value={answers[step.id] || 26}
                        onChange={handleAnswer}
                        minAge={14}
                        maxAge={80}
                    />
                );
            case 'hoursSlider':
                return (
                    <HoursSlider
                        value={answers[step.id] || 12.5}
                        onChange={handleAnswer}
                    />
                );
            case 'featureShowcase':
                return <FeatureShowcase />;
            case 'balanceSlider':
                return (
                    <BalanceSlider
                        value={answers[step.id] || 50}
                        onChange={handleAnswer}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />
            <Box flex={1} bg="background.primary" px={5}>
                {/* Header */}
                <VStack space={2} pt={2}>
                    <QuizHeader xpAmount={earnedXP} />
                    <QuizProgressIndicator
                        currentStep={currentStepIndex + 1}
                        totalSteps={totalSteps}
                    />
                </VStack>

                {/* Quiz Content */}
                <QuizContainer
                    titleLines={step.titleLines}
                    buttonLabel="Continuar"
                    onContinue={handleContinue}
                    isButtonDisabled={!isCurrentAnswerValid()}
                    showBack={currentStepIndex > 0}
                    onBack={handleBack}
                    largeTitleSize={step.type === 'featureShowcase'}
                >
                    {renderStepContent()}
                </QuizContainer>
            </Box>
        </SafeAreaView>
    );
}
