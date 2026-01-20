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

export function ProgressScreen() {
    const navigation = useNavigation();

    // Mock data - will be replaced with API calls
    const mockScore = {
        score: 88,
        percentageChange: 5,
    };

    const mockActivity = {
        data: [45, 60, 70, 55, 80, 75, 90],
        labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        status: 'Ótimo',
    };

    const mockStats = {
        totalXP: 12450,
        xpChange: '+1.2k essa semana',
        streakDays: 15,
        recordDays: 22,
    };

    const mockInsight = {
        message: "Sua produtividade em 'Estudos' aumentou 12% esta semana. Considere focar em 'vendas' amanhã entre 09:00 e 11:00 para otimizar seus resultados.",
    };

    const mockFocusItems = [
        { label: 'Produtos', percentage: 50, color: '#33CFFF' },
        { label: 'Vendas', percentage: 28, color: '#6366F1' },
        { label: 'Estudos', percentage: 22, color: '#2DD4BF' },
    ];

    const mockMilestones = [
        {
            id: '1',
            title: 'Meta de vendas batida',
            completedAt: 'Finalizado há 2 horas',
            xpReward: 500,
        },
        {
            id: '2',
            title: 'Curso de UI concluído',
            completedAt: 'Finalizado ontem',
            xpReward: 1200,
        },
        {
            id: '3',
            title: 'Review Semanal finalizada',
            completedAt: 'Finalizado há 2 dias',
            xpReward: 300,
        },
    ];

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
                    onPress={() => console.log('Notifications pressed')}
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
                        score={mockScore.score}
                        percentageChange={mockScore.percentageChange}
                        isPositive={true}
                    />

                    {/* Activity Chart */}
                    <ActivityChart
                        data={mockActivity.data}
                        labels={mockActivity.labels}
                        status={mockActivity.status}
                    />

                    {/* Stats Cards */}
                    <StatsCards
                        totalXP={mockStats.totalXP}
                        xpChange={mockStats.xpChange}
                        streakDays={mockStats.streakDays}
                        recordDays={mockStats.recordDays}
                    />

                    {/* AI Insights */}
                    <AIInsightsCard
                        message={mockInsight.message}
                        onViewMore={() => console.log('View more insights pressed')}
                    />

                    {/* Focus Distribution */}
                    <FocusDistribution items={mockFocusItems} />

                    {/* Recent Milestones */}
                    <RecentMilestones
                        milestones={mockMilestones}
                        onMilestonePress={(id) => console.log(`Milestone ${id} pressed`)}
                    />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
