import React, { useMemo } from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronBackIcon } from '../../components/icons/NavIcons';
import { MonthHeader, WeekCard, WeekStatus } from '../../components/month-detail';
import { GoalsStackParamList } from '../../navigation/MainNavigator';
import { useGoalsStore } from '../../store/goalsStore';
import Svg, { Path } from 'react-native-svg';

type MonthDetailNavigationProp = NativeStackNavigationProp<GoalsStackParamList, 'MonthDetail'>;
type MonthDetailRouteProp = RouteProp<GoalsStackParamList, 'MonthDetail'>;

interface WeekData {
    id: string;
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

    const { month = 'Fevereiro', yearNumber = 1, monthId } = route.params || {};

    // Get data from store
    const monthlyPlans = useGoalsStore((state) => state.monthlyPlans);
    const weeklyPlans = useGoalsStore((state) => state.weeklyPlans);
    const dailyTasks = useGoalsStore((state) => state.dailyTasks);

    // Find current month plan
    const currentMonth = useMemo(() => {
        if (monthId) {
            return monthlyPlans.find((m) => m.id === monthId);
        }
        // Fallback: find by month name
        // O plano começa em Fevereiro (mês 1 do plano = Fevereiro do calendário)
        const PLAN_START_MONTH = 1; // Fevereiro = índice 1 no calendário (0-indexed)
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        const calendarMonthIndex = monthNames.indexOf(month); // 0-indexed (Fevereiro = 1)

        // Converter índice do calendário para índice do plano
        // calendarMonthIndex = 1 (Fev) -> planMonthIndex = 1
        // calendarMonthIndex = 0 (Jan) -> planMonthIndex = 12 (jan do próximo ano)
        let planMonthIndex: number;
        if (calendarMonthIndex >= PLAN_START_MONTH) {
            planMonthIndex = calendarMonthIndex - PLAN_START_MONTH + 1;
        } else {
            planMonthIndex = 12 - PLAN_START_MONTH + calendarMonthIndex + 1;
        }

        return monthlyPlans.find((m) => m.monthNumber === planMonthIndex);
    }, [monthlyPlans, monthId, month]);

    // Get weekly plans for this month
    const weeksForMonth = useMemo(() => {
        if (!currentMonth) return [];
        return weeklyPlans.filter((w) => w.monthlyPlanId === currentMonth.id);
    }, [weeklyPlans, currentMonth]);

    // Calculate progress for each week
    const weeksWithProgress = useMemo((): WeekData[] => {
        return weeksForMonth.map((week) => {
            const tasksForWeek = dailyTasks.filter((t) => t.weeklyPlanId === week.id);
            const completedTasks = tasksForWeek.filter((t) => t.completed).length;
            const progress = tasksForWeek.length > 0
                ? Math.round((completedTasks / tasksForWeek.length) * 100)
                : 0;

            // Determine status
            let status: WeekStatus = 'pending';
            if (week.status === 'current') {
                status = 'current';
            } else if (week.status === 'completed' || progress === 100) {
                status = 'completed';
            }

            return {
                id: week.id,
                weekNumber: week.weekNumber,
                dateRange: week.dateRange,
                title: week.title,
                description: week.description || '',
                status,
                progress,
                isCurrent: week.status === 'current',
            };
        });
    }, [weeksForMonth, dailyTasks]);

    // Calculate overall month progress
    const monthProgress = useMemo(() => {
        if (weeksWithProgress.length === 0) return 0;
        const totalProgress = weeksWithProgress.reduce((sum, w) => sum + w.progress, 0);
        return Math.round(totalProgress / weeksWithProgress.length);
    }, [weeksWithProgress]);

    // Month header data
    const monthHeaderData = useMemo(() => {
        if (!currentMonth) {
            return {
                badge: 'Estratégia',
                focusLabel: 'Foco do mês',
                title: month,
                subtitle: '',
                progress: 0,
            };
        }

        // Split title into two lines if needed
        const titleParts = currentMonth.objectiveTitle.split(' ');
        const midPoint = Math.ceil(titleParts.length / 2);
        const title = titleParts.slice(0, midPoint).join(' ');
        const subtitle = titleParts.slice(midPoint).join(' ');

        return {
            badge: 'Estratégia',
            focusLabel: 'Foco do mês',
            title: title || currentMonth.objectiveTitle,
            subtitle: subtitle || '',
            progress: monthProgress,
        };
    }, [currentMonth, month, monthProgress]);

    const handleWeekPress = (week: WeekData) => {
        navigation.navigate('WeekDetail', {
            weekNumber: week.weekNumber,
            dateRange: week.dateRange,
            month: month,
            weekId: week.id,
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
                        badge={monthHeaderData.badge}
                        focusLabel={monthHeaderData.focusLabel}
                        title={monthHeaderData.title}
                        subtitle={monthHeaderData.subtitle}
                        progress={monthHeaderData.progress}
                    />

                    {/* Weeks List */}
                    <VStack space={4}>
                        {weeksWithProgress.length > 0 ? (
                            weeksWithProgress.map((week) => (
                                <WeekCard
                                    key={week.id}
                                    weekNumber={week.weekNumber}
                                    dateRange={week.dateRange}
                                    title={week.title}
                                    description={week.description}
                                    status={week.status}
                                    progress={week.progress}
                                    isCurrent={week.isCurrent}
                                    onPress={() => handleWeekPress(week)}
                                />
                            ))
                        ) : (
                            <Box
                                bg="background.secondary"
                                borderRadius="xl"
                                p={6}
                                alignItems="center"
                            >
                                <Text color="text.tertiary" fontSize="md" textAlign="center">
                                    Este mês ainda não foi planejado detalhadamente.
                                    {'\n'}Volte no último dia do mês anterior.
                                </Text>
                            </Box>
                        )}
                    </VStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
