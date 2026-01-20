import React, { useState } from 'react';
import { Box, VStack, HStack, Text, ScrollView } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PlanningHeader } from '../../components/planning';
import {
    RevenueHeader,
    MilestoneChips,
    MonthCard,
    ViewToggle,
    MonthStatus,
} from '../../components/year-detail';
import { GoalsStackParamList } from '../../navigation/MainNavigator';

type YearDetailNavigationProp = NativeStackNavigationProp<GoalsStackParamList, 'YearDetail'>;
type YearDetailRouteProp = RouteProp<GoalsStackParamList, 'YearDetail'>;

interface MonthData {
    month: string;
    monthName: string;
    status: MonthStatus;
    progress: number;
}

export function YearDetailScreen() {
    const navigation = useNavigation<YearDetailNavigationProp>();
    const route = useRoute<YearDetailRouteProp>();

    const { yearNumber = 1, phase = 'IMPLANTAÇÃO', revenue = '25.000' } = route.params || {};

    const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');

    // Mock data - will be replaced with API calls
    const mockMilestones = [
        { id: '1', label: 'Lançar MVP', isActive: true },
        { id: '2', label: '100 clientes', isActive: false },
        { id: '3', label: '+100 vendas', isActive: false },
    ];

    const mockMonths: MonthData[] = [
        { month: 'JAN', monthName: 'Janeiro', status: 'completed', progress: 100 },
        { month: 'FEB', monthName: 'Fevereiro', status: 'completed', progress: 100 },
        { month: 'MAR', monthName: 'Março', status: 'completed', progress: 100 },
        { month: 'APR', monthName: 'Abril', status: 'in_progress', progress: 65 },
        { month: 'MAY', monthName: 'Maio', status: 'pending', progress: 0 },
        { month: 'JUN', monthName: 'Junho', status: 'pending', progress: 0 },
        { month: 'JUL', monthName: 'Julho', status: 'pending', progress: 0 },
        { month: 'AGO', monthName: 'Agosto', status: 'pending', progress: 0 },
        { month: 'SEP', monthName: 'Setembro', status: 'pending', progress: 0 },
        { month: 'OCT', monthName: 'Outubro', status: 'pending', progress: 0 },
        { month: 'NOV', monthName: 'Novembro', status: 'pending', progress: 0 },
        { month: 'DEC', monthName: 'Dezembro', status: 'pending', progress: 0 },
    ];

    // Calculate overall progress based on months
    const completedMonths = mockMonths.filter(m => m.status === 'completed').length;
    const inProgressMonths = mockMonths.filter(m => m.status === 'in_progress');
    const overallProgress = Math.round(
        ((completedMonths + (inProgressMonths.length > 0 ? inProgressMonths[0].progress / 100 : 0)) / 12) * 100
    );

    // Group months into pairs for grid display
    const monthPairs: MonthData[][] = [];
    for (let i = 0; i < mockMonths.length; i += 2) {
        monthPairs.push([mockMonths[i], mockMonths[i + 1]]);
    }

    const handleMonthPress = (month: MonthData) => {
        navigation.navigate('MonthDetail', {
            month: month.monthName,
            yearNumber: yearNumber,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />

            {/* Header */}
            <PlanningHeader
                title={`Ano ${String(yearNumber).padStart(2, '0')} - ${phase}`}
                onBackPress={() => navigation.goBack()}
                onNotificationPress={() => console.log('Notifications pressed')}
            />

            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <VStack px={4} space={5}>
                    {/* Revenue Header */}
                    <RevenueHeader
                        revenue={revenue}
                        percentageIncrease={25}
                        currentRevenue="15.000"
                        progress={overallProgress}
                    />

                    {/* Milestone Chips */}
                    <MilestoneChips
                        milestones={mockMilestones}
                        onChipPress={(id) => console.log(`Milestone ${id} pressed`)}
                        onViewAllPress={() => console.log('View all pressed')}
                    />

                    {/* Monthly Breakdown Section */}
                    <VStack space={3}>
                        {/* Section Header */}
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color="text.primary" fontSize="md" fontWeight="semibold">
                                Detalhamento Mensal
                            </Text>
                            <ViewToggle
                                activeView={activeView}
                                onViewChange={setActiveView}
                            />
                        </HStack>

                        {/* Month Grid */}
                        <VStack space={3}>
                            {monthPairs.map((pair, index) => (
                                <HStack key={index} space={3}>
                                    {pair.map((month) => (
                                        <MonthCard
                                            key={month.month}
                                            month={month.month}
                                            status={month.status}
                                            progress={month.progress}
                                            onPress={() => handleMonthPress(month)}
                                        />
                                    ))}
                                </HStack>
                            ))}
                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
