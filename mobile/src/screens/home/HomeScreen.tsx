import React from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store/authStore';
import { UserHeader, EnergyCore, PriorityMission, TaskCard, AIInsight } from '../../components/home';
import {
    ReviewSocialAdsIcon,
    FollowUp5LeadsIcon,
    SprintPlanningIcon,
} from '../../components/icons/TaskIcons';
import { HomeStackParamList } from '../../navigation/MainNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

export function HomeScreen() {
    const { user } = useAuthStore();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    // Mock data - will be replaced with API calls
    const mockUserData = {
        name: user?.fullName?.split(' ')[0] || 'Patrick',
        status: 'Premium status',
        level: 24,
        streak: 12,
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    };

    const mockEnergyData = {
        currentXP: 750,
        maxXP: 1000,
        efficiency: 75,
    };

    const mockMissionData = {
        badge: 'Foco da semana',
        title: 'Lançar MVP do projeto X',
        subtitle: 'Finalizar testes de integração e deploy',
        progress: 80,
        timeRemaining: '02:15:00',
    };

    const mockTasks = [
        {
            id: '1',
            title: 'Revisar Social Ads',
            category: 'Marketing',
            icon: <ReviewSocialAdsIcon size={24} color="#9CA3AF" />,
            completed: false,
        },
        {
            id: '2',
            title: 'Follow-up 5 Leads',
            category: 'Vendas',
            icon: <FollowUp5LeadsIcon size={24} color="#9CA3AF" />,
            completed: false,
        },
        {
            id: '3',
            title: 'Sprint Planning',
            category: 'Vendas',
            icon: <SprintPlanningIcon size={22} color="#9CA3AF" />,
            completed: true,
        },
    ];

    const mockInsight = {
        message: 'Você está 15% mais produtivo que na semana passada. Focar em tarefas de alto impacto pela manhã está funcionando!',
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
                        userName={mockUserData.name}
                        userStatus={mockUserData.status}
                        level={mockUserData.level}
                        streak={mockUserData.streak}
                        avatarUrl={mockUserData.avatarUrl}
                        onAvatarPress={() => navigation.navigate('UserProfile')}
                    />

                    {/* Energy Core */}
                    <EnergyCore
                        currentXP={mockEnergyData.currentXP}
                        maxXP={mockEnergyData.maxXP}
                        efficiency={mockEnergyData.efficiency}
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
                            timeRemaining={mockMissionData.timeRemaining}
                            onPress={() => console.log('Mission pressed')}
                            onMenuPress={() => console.log('Menu pressed')}
                        />
                    </VStack>

                    {/* Tasks Section */}
                    <VStack space={3}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                                Suas Tarefas
                            </Text>
                            <Pressable>
                                <Text color="accent.400" fontSize="sm" fontWeight="medium">
                                    Expandir
                                </Text>
                            </Pressable>
                        </HStack>

                        <VStack space={2}>
                            {mockTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    icon={task.icon}
                                    title={task.title}
                                    category={task.category}
                                    isCompleted={task.completed}
                                    onPress={() => console.log(`Task ${task.id} pressed`)}
                                />
                            ))}
                        </VStack>
                    </VStack>

                    {/* AI Insight */}
                    <AIInsight message={mockInsight.message} />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
