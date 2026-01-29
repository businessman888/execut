import React from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronBackIcon } from '../../components/icons/NavIcons';
import { MonthHeader, WeekCard, WeekStatus } from '../../components/month-detail';
import { GoalsStackParamList } from '../../navigation/MainNavigator';
import Svg, { Path } from 'react-native-svg';

type MonthDetailNavigationProp = NativeStackNavigationProp<GoalsStackParamList, 'MonthDetail'>;
type MonthDetailRouteProp = RouteProp<GoalsStackParamList, 'MonthDetail'>;

interface WeekData {
    weekNumber: number;
    dateRange: string;
    title: string;
    description: string;
    status: WeekStatus;
    progress: number;
    isCurrent: boolean;
}

// Three dots menu icon
const DotsIcon = ({ color = '#6B7280', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            fill={color}
        />
        <Path
            d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
            fill={color}
        />
        <Path
            d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
            fill={color}
        />
    </Svg>
);

export function MonthDetailScreen() {
    const navigation = useNavigation<MonthDetailNavigationProp>();
    const route = useRoute<MonthDetailRouteProp>();

    const { month = 'Abril', yearNumber = 1 } = route.params || {};

    // Mock data - will be replaced with API calls
    const mockMonthData = {
        badge: 'Estratégia',
        focusLabel: 'Foco do mês',
        title: 'Validação de',
        subtitle: 'Mercado',
        progress: 35,
    };

    const mockWeeks: WeekData[] = [
        {
            weekNumber: 1,
            dateRange: '01-07 APR',
            title: 'Definição de Persona',
            description: 'Mapeamento de dores e necessidades',
            status: 'completed',
            progress: 100,
            isCurrent: false,
        },
        {
            weekNumber: 2,
            dateRange: '08-14 APR',
            title: 'Entrevistas com usuários',
            description: 'Validar hipóteses com 10 early adopters',
            status: 'current',
            progress: 40,
            isCurrent: true,
        },
        {
            weekNumber: 3,
            dateRange: '15-21 APR',
            title: 'Análise de dados',
            description: 'Compilação dos feedbacks qualitativos',
            status: 'pending',
            progress: 0,
            isCurrent: false,
        },
        {
            weekNumber: 4,
            dateRange: '22-31 MAY',
            title: 'Interação do Produto',
            description: 'Ajustes baseados na validação',
            status: 'pending',
            progress: 0,
            isCurrent: false,
        },
    ];

    const handleWeekPress = (week: WeekData) => {
        navigation.navigate('WeekDetail', {
            weekNumber: week.weekNumber,
            dateRange: week.dateRange,
            month: month,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />

            {/* Custom Header */}
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
                    {month}
                </Text>

                {/* Menu Button */}
                <Pressable
                    onPress={() => console.log('Menu pressed')}
                    p={2}
                    borderRadius="full"
                    _pressed={{ opacity: 0.7 }}
                >
                    <DotsIcon size={24} color="#F9FAFB" />
                </Pressable>
            </HStack>

            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <VStack px={4} space={5}>
                    {/* Month Header */}
                    <MonthHeader
                        badge={mockMonthData.badge}
                        focusLabel={mockMonthData.focusLabel}
                        title={mockMonthData.title}
                        subtitle={mockMonthData.subtitle}
                        progress={mockMonthData.progress}
                    />

                    {/* Weeks List */}
                    <VStack space={4}>
                        {mockWeeks.map((week) => (
                            <WeekCard
                                key={week.weekNumber}
                                weekNumber={week.weekNumber}
                                dateRange={week.dateRange}
                                title={week.title}
                                description={week.description}
                                status={week.status}
                                progress={week.progress}
                                isCurrent={week.isCurrent}
                                onPress={() => handleWeekPress(week)}
                            />
                        ))}
                    </VStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
