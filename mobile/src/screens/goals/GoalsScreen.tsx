import React, { useEffect } from 'react';
import { Box, VStack, ScrollView, HStack, Text } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlanningHeader, VisionCard, MilestoneCard } from '../../components/planning';
import { GoalsStackParamList } from '../../navigation/MainNavigator';
import { useFiveYearPlan } from '../../store/goalsStore';
import { apiClient } from '../../services/api/client';
import { useAuthStore } from '../../store/authStore';

type GoalsScreenNavigationProp = NativeStackNavigationProp<GoalsStackParamList, 'GoalsMain'>;

export function GoalsScreen() {
    const navigation = useNavigation<GoalsScreenNavigationProp>();
    const { plan, yearlyGoals, isLoading, isPlanGenerated } = useFiveYearPlan();
    const { user } = useAuthStore();

    // Buscar plano ao montar componente
    useEffect(() => {
        if (user?.id && !isPlanGenerated) {
            fetchPlan();
        }
    }, [user?.id]);

    const fetchPlan = async () => {
        try {
            if (!user?.id) return;
            const response = await apiClient.getFullPlan(user.id);
            // O store será atualizado automaticamente
            console.log('Plan fetched:', response);
        } catch (error) {
            console.error('Error fetching plan:', error);
        }
    };

    // Transformar yearlyGoals em formato de milestones
    const milestones = yearlyGoals.length > 0
        ? yearlyGoals.map((goal, index) => ({
            yearNumber: goal.yearNumber,
            phase: goal.phase,
            title: goal.title,
            revenue: goal.revenueTarget?.toLocaleString('pt-BR') || '0',
            isActive: goal.isActive,
            showQuarters: goal.isActive,
            quarters: goal.isActive
                ? [
                    { label: 'Q1', title: 'Janeiro-Março' },
                    { label: 'Q2', title: 'Abril-Junho' },
                    { label: 'Q3', title: 'Julho-Setembro' },
                    { label: 'Q4', title: 'Outubro-Dezembro' },
                ]
                : undefined,
            progress: goal.isActive ? 0 : undefined,
            icon: index === 4 ? ('celebration' as const) : goal.isActive ? ('money' as const) : null,
            id: goal.id,
        }))
        : getMockMilestones();

    const handleMilestonePress = (milestone: typeof milestones[0]) => {
        // Apenas anos ativos ou completados podem ser navegados
        if (!milestone.isActive && milestone.yearNumber !== 1) {
            // Mostrar toast ou feedback visual
            return;
        }

        navigation.navigate('YearDetail', {
            yearNumber: milestone.yearNumber,
            phase: milestone.phase,
            title: milestone.title,
            revenue: milestone.revenue,
        });
    };

    // Se não há plano gerado, mostrar tela de início
    if (!isPlanGenerated && !isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
                <StatusBar style="light" />
                <PlanningHeader
                    title="Planejamento"
                    onBackPress={() => navigation.goBack()}
                    onNotificationPress={() => console.log('Notifications pressed')}
                />
                <Box flex={1} alignItems="center" justifyContent="center" px={6}>
                    <Ionicons name="rocket-outline" size={80} color="#00C3FF" />
                    <Text
                        fontSize={24}
                        fontWeight="bold"
                        color="white"
                        textAlign="center"
                        mt={6}
                    >
                        Seu plano de 5 anos
                    </Text>
                    <Text
                        fontSize={16}
                        color="#8A8A8A"
                        textAlign="center"
                        mt={3}
                    >
                        Complete o quiz inicial para gerar seu plano personalizado
                    </Text>
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => {
                            // Navegar para o quiz
                            (navigation as any).navigate('OnboardingQuiz');
                        }}
                    >
                        <Text style={styles.startButtonText}>Começar Quiz</Text>
                    </TouchableOpacity>
                </Box>
            </SafeAreaView>
        );
    }

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
                <StatusBar style="light" />
                <Box flex={1} alignItems="center" justifyContent="center">
                    <ActivityIndicator size="large" color="#00C3FF" />
                    <Text color="#8A8A8A" mt={4}>Carregando seu plano...</Text>
                </Box>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />

            {/* Header */}
            <PlanningHeader
                title="Planejamento"
                onBackPress={() => navigation.goBack()}
                onNotificationPress={() => console.log('Notifications pressed')}
            />

            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <VStack px={4} space={6}>
                    {/* Vision Card */}
                    <VisionCard
                        title="Minha visão de futuro"
                        description={plan?.visionStatement || 'Defina sua visão de 5 anos...'}
                        tags={['freedom', 'SaaS', 'Growth']}
                        onEditPress={() => console.log('Edit vision pressed')}
                    />

                    {/* Timeline connector */}
                    <Box
                        position="absolute"
                        left={6}
                        top={200}
                        bottom={0}
                        w={0.5}
                        bg="border.default"
                    />

                    {/* Milestones */}
                    <VStack space={6}>
                        {milestones.map((milestone) => (
                            <MilestoneCard
                                key={milestone.yearNumber}
                                yearNumber={milestone.yearNumber}
                                phase={milestone.phase}
                                title={milestone.title}
                                revenue={milestone.revenue}
                                isActive={milestone.isActive}
                                showQuarters={milestone.showQuarters}
                                quarters={milestone.quarters}
                                progress={milestone.progress}
                                icon={milestone.icon}
                                onPress={() => handleMilestonePress(milestone)}
                            />
                        ))}
                    </VStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}

// Mock data fallback
function getMockMilestones() {
    return [
        {
            yearNumber: 1,
            phase: 'IMPLANTAÇÃO',
            title: 'Consolidação Digital',
            revenue: '10.000',
            isActive: true,
            showQuarters: true,
            quarters: [
                { label: 'Q1', title: 'Setup & MVP' },
                { label: 'Q2', title: 'Lançamento' },
                { label: 'Q3', title: 'Escalabilidade' },
                { label: 'Q4', title: 'Otimização' },
            ],
            progress: 72.4,
            icon: 'money' as const,
            id: 'mock-1',
        },
        {
            yearNumber: 2,
            phase: 'EXPANSÃO',
            title: 'Networking e Ecossistema',
            revenue: '25.000',
            isActive: false,
            icon: null,
            id: 'mock-2',
        },
        {
            yearNumber: 3,
            phase: 'MATURIDADE',
            title: 'Estratégia e Equity',
            revenue: '45.000',
            isActive: false,
            icon: null,
            id: 'mock-3',
        },
        {
            yearNumber: 4,
            phase: 'GLOBALIZAÇÃO',
            title: 'Internacionalização da marca',
            revenue: '145.000',
            isActive: false,
            icon: null,
            id: 'mock-4',
        },
        {
            yearNumber: 5,
            phase: 'O GRANDE OBJETIVO',
            title: 'Alcance do objetivo Final',
            revenue: '545.000',
            isActive: false,
            icon: 'celebration' as const,
            id: 'mock-5',
        },
    ];
}

const styles = StyleSheet.create({
    startButton: {
        backgroundColor: '#00C3FF',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 40,
        marginTop: 32,
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
