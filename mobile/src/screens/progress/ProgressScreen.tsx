import React from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { ChevronBackIcon, BellIcon } from '../../components/icons/NavIcons';
import {
    ScoreCard,
    ActivityChart,
    StatsCards,
    AIInsightsCard,
    FocusDistribution,
    RecentMilestones,
} from '../../components/dashboard';
import { useAuthStore } from '../../store/authStore';
import { usePlanProgress } from '../../store/goalsStore';

export function ProgressScreen() {
    const navigation = useNavigation();
    const { profile } = useAuthStore();
    const { totalTasks, completedTasks, progressPercent } = usePlanProgress();

    // Verificar se usuário tem progresso
    const hasProgress = totalTasks > 0 && completedTasks > 0;

    // Dados reais de score (baseado em tarefas completadas)
    const realScore = {
        score: progressPercent,
        changeMessage: hasProgress ? undefined : 'Comece suas tarefas!',
        percentageChange: hasProgress ? 0 : undefined,
    };

    // Dados reais de atividade (7 dias - todos zeros se sem progresso)
    const realActivity = {
        data: hasProgress ? [0, 0, 0, 0, 0, 0, progressPercent] : [0, 0, 0, 0, 0, 0, 0],
        labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        status: hasProgress ? (progressPercent >= 70 ? 'Ótimo' : progressPercent >= 40 ? 'Bom' : 'Iniciando') : 'Sem atividade',
    };

    // Dados reais de estatísticas
    const realStats = {
        totalXP: profile?.totalXp ?? 0,
        xpChange: hasProgress ? '+0 essa semana' : 'Comece a executar!',
        streakDays: profile?.streak ?? 0,
        recordDays: profile?.streak ?? 0,
    };

    // Insight baseado no progresso
    const realInsight = {
        message: hasProgress
            ? `Você completou ${completedTasks} de ${totalTasks} tarefas. Continue assim para melhorar sua produtividade!`
            : 'Comece a executar suas tarefas para receber insights personalizados sobre sua produtividade!',
    };

    // Distribuição de foco (vazia se sem progresso)
    const realFocusItems = hasProgress
        ? [
            { label: 'Tarefas', percentage: 100, color: '#33CFFF' },
        ]
        : [
            { label: 'Sem dados', percentage: 100, color: '#333333' },
        ];

    // Milestones recentes (vazio se sem progresso)
    const realMilestones = hasProgress
        ? []
        : [];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />

            {/* Header */}
            <HStack
                alignItems="center"
                justifyContent="space-between"
                px={4}
                py={3}
                w="100%"
            >
                {/* Back Button */}
                <Pressable
                    onPress={() => navigation.goBack()}
                    p={2}
                    borderRadius="full"
                    _pressed={{ opacity: 0.7 }}
                >
                    <ChevronBackIcon size={24} color="#F9FAFB" />
                </Pressable>

                {/* Title */}
                <Text color="text.secondary" fontSize="lg" fontWeight="normal">
                    Dashboard
                </Text>

                {/* Bell Button */}
                <Pressable
                    onPress={() => (navigation as any).navigate('Notifications')}
                    p={2}
                    borderRadius="full"
                    _pressed={{ opacity: 0.7 }}
                >
                    <BellIcon size={24} color="#33CFFF" />
                </Pressable>
            </HStack>

            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <VStack px={4} space={4}>
                    {/* Score Card */}
                    <ScoreCard
                        score={realScore.score}
                        percentageChange={realScore.percentageChange}
                        changeMessage={realScore.changeMessage}
                        isPositive={true}
                    />

                    {/* Activity Chart */}
                    <ActivityChart
                        data={realActivity.data}
                        labels={realActivity.labels}
                        status={realActivity.status}
                    />

                    {/* Stats Cards */}
                    <StatsCards
                        totalXP={realStats.totalXP}
                        xpChange={realStats.xpChange}
                        streakDays={realStats.streakDays}
                        recordDays={realStats.recordDays}
                    />

                    {/* AI Insights */}
                    <AIInsightsCard
                        message={realInsight.message}
                        onViewMore={() => console.log('View more insights pressed')}
                    />

                    {/* Focus Distribution */}
                    <FocusDistribution items={realFocusItems} />

                    {/* Recent Milestones */}
                    <RecentMilestones
                        milestones={realMilestones}
                        onMilestonePress={(id) => console.log(`Milestone ${id} pressed`)}
                    />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
