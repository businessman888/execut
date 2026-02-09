import React, { useEffect } from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useCurrentDayTasks, usePlanProgress } from '../../store/goalsStore';
import { UserHeader, EnergyCore, PriorityMission, TaskCard, AIInsight } from '../../components/home';
import {
    ReviewSocialAdsIcon,
    FollowUp5LeadsIcon,
    SprintPlanningIcon,
} from '../../components/icons/TaskIcons';
import { HomeStackParamList } from '../../navigation/MainNavigator';
import { apiClient } from '../../services/api/client';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

// Ícone baseado na categoria
function getCategoryIcon(category: string | null, color: string = '#9CA3AF') {
    switch (category?.toLowerCase()) {
        case 'marketing':
            return <ReviewSocialAdsIcon size={24} color={color} />;
        case 'vendas':
            return <FollowUp5LeadsIcon size={24} color={color} />;
        case 'estratégia':
            return <SprintPlanningIcon size={22} color={color} />;
        case 'produto':
            return <Ionicons name="cube-outline" size={24} color={color} />;
        case 'operações':
            return <Ionicons name="cog-outline" size={24} color={color} />;
        default:
            return <Ionicons name="checkbox-outline" size={24} color={color} />;
    }
}

export function HomeScreen() {
    const { user, profile } = useAuthStore();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    // Dados do store
    const { tasks: currentDayTasks, toggleTask, setCurrentDayTasks, isLoading } = useCurrentDayTasks();
    const { totalTasks, completedTasks, progressPercent, currentMonth } = usePlanProgress();

    // Buscar tarefas do dia ao montar
    useEffect(() => {
        if (user?.id) {
            fetchCurrentDayTasks();
        }
    }, [user?.id]);

    const fetchCurrentDayTasks = async () => {
        try {
            if (!user?.id) return;
            const tasks = await apiClient.getCurrentDayTasks(user.id);
            // Salvar tarefas no store
            setCurrentDayTasks(tasks);
            console.log('Current day tasks fetched and saved:', tasks);
        } catch (error) {
            console.error('Error fetching current day tasks:', error);
        }
    };

    // Calcular XP potencial do dia
    const dailyXP = currentDayTasks.reduce((acc, task) => acc + task.xpReward, 0);
    const completedXP = currentDayTasks
        .filter((t) => t.completed)
        .reduce((acc, task) => acc + task.xpReward, 0);

    // Dados reais do usuário (com fallbacks para novos usuários)
    const userName = profile?.fullName?.split(' ')[0] || user?.fullName?.split(' ')[0] || 'Usuário';
    const realUserData = {
        name: userName,
        status: profile?.fullName ? 'Membro ativo' : 'Novo membro',
        level: profile?.currentLevel ?? 0,
        streak: profile?.streak ?? 0,
        avatarUrl: profile?.avatarUrl,
    };

    // Dados reais de energia/progresso
    const realEnergyData = {
        currentXP: completedXP,
        maxXP: dailyXP || 25,
        efficiency: currentDayTasks.length > 0
            ? Math.round((currentDayTasks.filter((t) => t.completed).length / currentDayTasks.length) * 100)
            : 0,
    };

    const mockMissionData = {
        badge: currentMonth?.objectiveTitle || 'Foco da semana',
        title: currentMonth?.objectiveTitle || 'Lançar MVP do projeto X',
        subtitle: currentMonth?.objectiveDescription || 'Finalizar testes de integração e deploy',
        progress: progressPercent,
        timeRemaining: '02:15:00',
    };

    // Usar APENAS tarefas do store
    const displayTasks = currentDayTasks.map((task) => ({
        id: task.id,
        title: task.title,
        category: task.category || 'Geral',
        icon: getCategoryIcon(task.category),
        completed: task.completed,
        xpReward: task.xpReward,
    }));

    const handleTaskPress = async (taskId: string) => {
        // Toggle local
        toggleTask(taskId);

        // Sync com backend
        try {
            if (user?.id) {
                await apiClient.togglePlanningTask(taskId, user.id);
            }
        } catch (error) {
            console.error('Error toggling task:', error);
            // Reverter toggle local em caso de erro
            toggleTask(taskId);
        }
    };

    const mockInsight = {
        message: currentDayTasks.length > 0
            ? `Você tem ${currentDayTasks.length} tarefas para hoje. ${currentDayTasks.filter((t) => t.completed).length > 0
                ? `Já completou ${currentDayTasks.filter((t) => t.completed).length}. Continue assim!`
                : 'Comece pela mais importante!'
            }`
            : 'Você está 15% mais produtivo que na semana passada. Focar em tarefas de alto impacto pela manhã está funcionando!',
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />
            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <VStack px={4} pt={4} space={5}>
                    {/* User Header */}
                    <UserHeader
                        userName={realUserData.name}
                        userStatus={realUserData.status}
                        level={realUserData.level}
                        streak={realUserData.streak}
                        avatarUrl={realUserData.avatarUrl}
                        onAvatarPress={() => navigation.navigate('UserProfile')}
                    />

                    {/* Energy Core */}
                    <EnergyCore
                        currentXP={realEnergyData.currentXP}
                        maxXP={realEnergyData.maxXP}
                        efficiency={realEnergyData.efficiency}
                    />

                    {/* Priority Mission Section */}
                    <VStack space={3}>
                        <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                            Missão Prioritária
                        </Text>
                        <PriorityMission
                            badge={mockMissionData.badge}
                            title={mockMissionData.title}
                            subtitle={mockMissionData.subtitle}
                            progress={mockMissionData.progress}
                            onPress={() => console.log('Mission pressed')}
                            onMenuPress={() => console.log('Menu pressed')}
                        />
                    </VStack>

                    {/* Tasks Section */}
                    <VStack space={3}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <HStack alignItems="center" space={2}>
                                <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                                    Suas Tarefas
                                </Text>
                                {isLoading && (
                                    <ActivityIndicator size="small" color="#00C3FF" />
                                )}
                            </HStack>
                            <Pressable onPress={() => (navigation as any).navigate('Goals')}>
                                <Text color="accent.400" fontSize="sm" fontWeight="medium">
                                    Ver Planejamento
                                </Text>
                            </Pressable>
                        </HStack>

                        <VStack space={2}>
                            {displayTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    icon={task.icon}
                                    title={task.title}
                                    category={task.category}
                                    isCompleted={task.completed}
                                    onPress={() => handleTaskPress(task.id)}
                                />
                            ))}
                        </VStack>

                        {/* XP Summary */}
                        {currentDayTasks.length > 0 && (
                            <HStack
                                bg="#1A1A1A"
                                borderRadius={12}
                                p={3}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <HStack alignItems="center" space={2}>
                                    <Ionicons name="flash" size={20} color="#FFD700" />
                                    <Text color="text.secondary" fontSize="sm">
                                        XP do dia
                                    </Text>
                                </HStack>
                                <Text color="text.primary" fontSize="sm" fontWeight="bold">
                                    {completedXP} / {dailyXP} XP
                                </Text>
                            </HStack>
                        )}
                    </VStack>

                    {/* AI Insight */}
                    <AIInsight message={mockInsight.message} />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}

// Mock tasks fallback
function getMockTasks() {
    return [
        {
            id: '1',
            title: 'Revisar Social Ads',
            category: 'Marketing',
            icon: <ReviewSocialAdsIcon size={24} color="#9CA3AF" />,
            completed: false,
            xpReward: 25,
        },
        {
            id: '2',
            title: 'Follow-up 5 Leads',
            category: 'Vendas',
            icon: <FollowUp5LeadsIcon size={24} color="#9CA3AF" />,
            completed: false,
            xpReward: 30,
        },
        {
            id: '3',
            title: 'Sprint Planning',
            category: 'Operações',
            icon: <SprintPlanningIcon size={22} color="#9CA3AF" />,
            completed: true,
            xpReward: 20,
        },
    ];
}
