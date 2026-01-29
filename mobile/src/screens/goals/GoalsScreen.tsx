import React from 'react';
import { Box, VStack, ScrollView } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PlanningHeader, VisionCard, MilestoneCard } from '../../components/planning';
import { GoalsStackParamList } from '../../navigation/MainNavigator';

type GoalsScreenNavigationProp = NativeStackNavigationProp<GoalsStackParamList, 'GoalsMain'>;

export function GoalsScreen() {
    const navigation = useNavigation<GoalsScreenNavigationProp>();

    // Mock data - will be replaced with API calls
    const mockVision = {
        title: 'Minha visão de futuro',
        description: 'Conquistar independência financeira com a construção de saas, construindo um império de aplicativos, com aplicativos na área de wellness, tanto lifestyle, quanto gestão da saúde.',
        tags: ['freedom', 'SaaS', 'Growth'],
    };

    const mockMilestones = [
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
        },
        {
            yearNumber: 2,
            phase: 'EXPANSÃO',
            title: 'Networking e Ecossistema',
            revenue: '25.000',
            isActive: false,
            icon: null,
        },
        {
            yearNumber: 3,
            phase: 'MATURIDADE',
            title: 'Estratégia e Equity',
            revenue: '45.000',
            isActive: false,
            icon: null,
        },
        {
            yearNumber: 4,
            phase: 'GLOBALIZAÇÃO',
            title: 'Internacionalização da marca',
            revenue: '145.000',
            isActive: false,
            icon: null,
        },
        {
            yearNumber: 5,
            phase: 'O GRANDE OBJETIVO',
            title: 'Alcance do objetivo Final',
            revenue: '545.000',
            isActive: false,
            icon: 'celebration' as const,
        },
    ];

    const handleMilestonePress = (milestone: typeof mockMilestones[0]) => {
        navigation.navigate('YearDetail', {
            yearNumber: milestone.yearNumber,
            phase: milestone.phase,
            title: milestone.title,
            revenue: milestone.revenue,
        });
    };

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
                        title={mockVision.title}
                        description={mockVision.description}
                        tags={mockVision.tags}
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
                        {mockMilestones.map((milestone) => (
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
