import React, { useState, useRef } from 'react';
import { Box, VStack, HStack, Text, ScrollView } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Modal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlanningHeader } from '../../components/planning';
import {
    RevenueHeader,
    MilestoneChips,
    MonthCard,
    ViewToggle,
    MonthStatus,
} from '../../components/year-detail';
import { GoalsStackParamList } from '../../navigation/MainNavigator';
import { useGoalsStore } from '../../store/goalsStore';
import { MonthlyPlan } from '../../types/planning';

type YearDetailNavigationProp = NativeStackNavigationProp<GoalsStackParamList, 'YearDetail'>;
type YearDetailRouteProp = RouteProp<GoalsStackParamList, 'YearDetail'>;

interface MonthData {
    id: string;
    month: string;
    monthName: string;
    status: MonthStatus;
    progress: number;
    objectiveTitle: string;
    objectiveDescription: string | null;
    monthNumber: number;
}

export function YearDetailScreen() {
    const navigation = useNavigation<YearDetailNavigationProp>();
    const route = useRoute<YearDetailRouteProp>();
    const { monthlyPlans, yearlyGoals } = useGoalsStore();

    const { yearNumber = 1, phase = 'IMPLANTAÇÃO', revenue = '25.000' } = route.params || {};

    const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
    const [previewModal, setPreviewModal] = useState<{ visible: boolean; month: MonthData | null }>({
        visible: false,
        month: null,
    });

    const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Obter planos mensais do ano selecionado
    const yearGoal = yearlyGoals.find((y) => y.yearNumber === yearNumber);
    const yearMonthlyPlans = yearGoal
        ? monthlyPlans.filter((m) => m.yearlyGoalId === yearGoal.id)
        : [];

    // Converter para formato de exibição
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const monthAbbr = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    const months: MonthData[] = yearMonthlyPlans.length > 0
        ? yearMonthlyPlans.map((plan) => ({
            id: plan.id,
            month: monthAbbr[plan.monthNumber - 1],
            monthName: monthNames[plan.monthNumber - 1],
            status: mapStatus(plan.status),
            progress: plan.progress,
            objectiveTitle: plan.objectiveTitle,
            objectiveDescription: plan.objectiveDescription,
            monthNumber: plan.monthNumber,
        }))
        : getMockMonths();

    // Calcular progresso geral
    const completedMonths = months.filter((m) => m.status === 'completed').length;
    const inProgressMonths = months.filter((m) => m.status === 'in_progress');
    const overallProgress = Math.round(
        ((completedMonths + (inProgressMonths.length > 0 ? inProgressMonths[0].progress / 100 : 0)) / 12) * 100
    );

    // Agrupar meses em pares
    const monthPairs: MonthData[][] = [];
    for (let i = 0; i < months.length; i += 2) {
        monthPairs.push([months[i], months[i + 1]]);
    }

    const handleMonthPress = (month: MonthData) => {
        // Se mês estiver bloqueado, não navegar
        if (month.status === 'pending') {
            return;
        }

        navigation.navigate('MonthDetail', {
            month: month.monthName,
            yearNumber: yearNumber,
        });
    };

    const handleMonthLongPress = (month: MonthData) => {
        // Mostrar modal de preview para meses bloqueados
        if (month.status === 'pending') {
            setPreviewModal({ visible: true, month });
        }
    };

    const handlePressIn = (month: MonthData) => {
        if (month.status === 'pending') {
            longPressTimerRef.current = setTimeout(() => {
                handleMonthLongPress(month);
            }, 500);
        }
    };

    const handlePressOut = () => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    };

    // Milestones mockados (podem ser derivados das metas mensais)
    const mockMilestones = [
        { id: '1', label: 'Lançar MVP', isActive: months.some((m) => m.status === 'in_progress' && m.monthNumber <= 3) },
        { id: '2', label: '100 clientes', isActive: false },
        { id: '3', label: '+100 vendas', isActive: false },
    ];

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
                                        <Pressable
                                            key={month.month}
                                            onPress={() => handleMonthPress(month)}
                                            onPressIn={() => handlePressIn(month)}
                                            onPressOut={handlePressOut}
                                            style={{ flex: 1 }}
                                        >
                                            <MonthCard
                                                month={month.month}
                                                status={month.status}
                                                progress={month.progress}
                                                onPress={() => handleMonthPress(month)}
                                            />
                                        </Pressable>
                                    ))}
                                </HStack>
                            ))}
                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>

            {/* Modal de Preview para meses bloqueados */}
            <Modal
                visible={previewModal.visible}
                transparent
                animationType="fade"
                onRequestClose={() => setPreviewModal({ visible: false, month: null })}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setPreviewModal({ visible: false, month: null })}
                >
                    <Pressable style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Ionicons name="lock-closed" size={24} color="#00C3FF" />
                            <Text style={styles.modalTitle}>
                                {previewModal.month?.monthName}
                            </Text>
                        </View>

                        <Text style={styles.modalObjective}>
                            {previewModal.month?.objectiveTitle || 'Objetivo a ser definido'}
                        </Text>

                        {previewModal.month?.objectiveDescription && (
                            <Text style={styles.modalDescription}>
                                {previewModal.month.objectiveDescription}
                            </Text>
                        )}

                        <View style={styles.lockedBadge}>
                            <Ionicons name="time-outline" size={16} color="#8A8A8A" />
                            <Text style={styles.lockedText}>
                                Será desbloqueado automaticamente
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setPreviewModal({ visible: false, month: null })}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

// Mapear status do backend para frontend
function mapStatus(status: MonthlyPlan['status']): MonthStatus {
    switch (status) {
        case 'unlocked':
            return 'in_progress';
        case 'completed':
            return 'completed';
        case 'locked':
        default:
            return 'pending';
    }
}

// Mock data fallback
function getMockMonths(): MonthData[] {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const monthAbbr = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    return [
        { id: '1', month: 'JAN', monthName: 'Janeiro', status: 'completed', progress: 100, objectiveTitle: 'Validação', objectiveDescription: null, monthNumber: 1 },
        { id: '2', month: 'FEV', monthName: 'Fevereiro', status: 'in_progress', progress: 65, objectiveTitle: 'MVP', objectiveDescription: null, monthNumber: 2 },
        { id: '3', month: 'MAR', monthName: 'Março', status: 'pending', progress: 0, objectiveTitle: 'Lançamento', objectiveDescription: 'Lançar produto para primeiros clientes', monthNumber: 3 },
        { id: '4', month: 'ABR', monthName: 'Abril', status: 'pending', progress: 0, objectiveTitle: 'Escala', objectiveDescription: null, monthNumber: 4 },
        { id: '5', month: 'MAI', monthName: 'Maio', status: 'pending', progress: 0, objectiveTitle: 'Otimização', objectiveDescription: null, monthNumber: 5 },
        { id: '6', month: 'JUN', monthName: 'Junho', status: 'pending', progress: 0, objectiveTitle: 'Crescimento', objectiveDescription: null, monthNumber: 6 },
        { id: '7', month: 'JUL', monthName: 'Julho', status: 'pending', progress: 0, objectiveTitle: 'Consolidação', objectiveDescription: null, monthNumber: 7 },
        { id: '8', month: 'AGO', monthName: 'Agosto', status: 'pending', progress: 0, objectiveTitle: 'Processos', objectiveDescription: null, monthNumber: 8 },
        { id: '9', month: 'SET', monthName: 'Setembro', status: 'pending', progress: 0, objectiveTitle: 'Equipe', objectiveDescription: null, monthNumber: 9 },
        { id: '10', month: 'OUT', monthName: 'Outubro', status: 'pending', progress: 0, objectiveTitle: 'Marketing', objectiveDescription: null, monthNumber: 10 },
        { id: '11', month: 'NOV', monthName: 'Novembro', status: 'pending', progress: 0, objectiveTitle: 'Expansão', objectiveDescription: null, monthNumber: 11 },
        { id: '12', month: 'DEZ', monthName: 'Dezembro', status: 'pending', progress: 0, objectiveTitle: 'Fechamento', objectiveDescription: null, monthNumber: 12 },
    ];
}

import { View } from 'react-native';

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 340,
        borderWidth: 1,
        borderColor: '#00C3FF33',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    modalObjective: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 14,
        color: '#8A8A8A',
        lineHeight: 20,
        marginBottom: 16,
    },
    lockedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A0A0A',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 8,
        marginBottom: 20,
    },
    lockedText: {
        fontSize: 12,
        color: '#8A8A8A',
    },
    closeButton: {
        backgroundColor: '#00C3FF',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
