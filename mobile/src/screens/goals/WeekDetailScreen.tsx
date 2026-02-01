import React, { useState, useMemo, useRef } from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable, Button } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronBackIcon } from '../../components/icons/NavIcons';
import { WeekObjectiveCard, DayRow, DayStatus } from '../../components/week-detail';
import { DailyTaskModal } from '../../components/modals';
import { GoalsStackParamList, MainTabParamList } from '../../navigation/MainNavigator';
import { useGoalsStore } from '../../store/goalsStore';
import { DailyTask } from '../../types/planning';
import Svg, { Path } from 'react-native-svg';

type WeekDetailNavigationProp = NativeStackNavigationProp<GoalsStackParamList, 'WeekDetail'>;
type WeekDetailRouteProp = RouteProp<GoalsStackParamList, 'WeekDetail'>;

interface DayData {
    dayName: string;
    dayNumber: number;
    fullDate: string;
    taskCount: number;
    status: DayStatus;
    statusLabel: string;
    isCurrent: boolean;
    tasks: DailyTask[];
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

export function WeekDetailScreen() {
    const navigation = useNavigation<WeekDetailNavigationProp>();
    const route = useRoute<WeekDetailRouteProp>();

    const { weekNumber = 1, dateRange = 'FEB 01 - FEB 07', month = 'Fevereiro', weekId } = route.params || {};

    // State for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

    // Long press handling
    const longPressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Get data from store
    const weeklyPlans = useGoalsStore((state) => state.weeklyPlans);
    const dailyTasks = useGoalsStore((state) => state.dailyTasks);

    // Find current week
    const currentWeek = useMemo(() => {
        if (weekId) {
            return weeklyPlans.find((w) => w.id === weekId);
        }
        return weeklyPlans.find((w) => w.weekNumber === weekNumber);
    }, [weeklyPlans, weekId, weekNumber]);

    // Get tasks for this week
    const tasksForWeek = useMemo(() => {
        if (!currentWeek) return [];
        return dailyTasks.filter((t) => t.weeklyPlanId === currentWeek.id);
    }, [dailyTasks, currentWeek]);

    // Calculate week progress
    const weekProgress = useMemo(() => {
        if (tasksForWeek.length === 0) return 0;
        const completed = tasksForWeek.filter((t) => t.completed).length;
        return Math.round((completed / tasksForWeek.length) * 100);
    }, [tasksForWeek]);

    // Get today's date
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Build days data
    const daysData = useMemo((): DayData[] => {
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
        const days: DayData[] = [];

        // Group tasks by date
        const tasksByDate: Record<string, DailyTask[]> = {};
        tasksForWeek.forEach((task) => {
            if (!tasksByDate[task.scheduledDate]) {
                tasksByDate[task.scheduledDate] = [];
            }
            tasksByDate[task.scheduledDate].push(task);
        });

        // Get unique dates sorted
        const uniqueDates = [...new Set(tasksForWeek.map((t) => t.scheduledDate))].sort();

        uniqueDates.forEach((dateStr) => {
            const date = new Date(dateStr + 'T12:00:00'); // Avoid timezone issues
            const dayOfWeek = date.getDay();
            const dayNumber = date.getDate();
            const tasksForDay = tasksByDate[dateStr] || [];
            const completedTasks = tasksForDay.filter((t) => t.completed).length;

            const isToday = dateStr === todayStr;
            const isPast = dateStr < todayStr;
            const isFuture = dateStr > todayStr;

            let status: DayStatus = 'scheduled';
            let statusLabel = 'Agendadas';

            if (isToday) {
                status = 'current';
                statusLabel = 'Em progresso';
            } else if (isPast) {
                if (completedTasks === tasksForDay.length && tasksForDay.length > 0) {
                    status = 'completed';
                    statusLabel = 'Completo';
                } else {
                    status = 'completed';
                    statusLabel = `${completedTasks}/${tasksForDay.length}`;
                }
            } else if (tasksForDay.length === 0) {
                status = 'empty';
                statusLabel = '';
            }

            days.push({
                dayName: dayNames[dayOfWeek],
                dayNumber,
                fullDate: dateStr,
                taskCount: tasksForDay.length,
                status,
                statusLabel,
                isCurrent: isToday,
                tasks: tasksForDay,
            });
        });

        return days;
    }, [tasksForWeek, todayStr]);

    // Handle day press - navigate to Home if today, show modal otherwise
    const handleDayPress = (day: DayData) => {
        if (day.isCurrent) {
            // Navigate to Home tab
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Main',
                            state: {
                                routes: [{ name: 'Home' }],
                            },
                        },
                    ],
                })
            );
        }
    };

    // Handle long press start
    const handlePressIn = (day: DayData) => {
        longPressTimeout.current = setTimeout(() => {
            // Show modal for future days
            if (!day.isCurrent && day.tasks.length > 0) {
                setSelectedDay(day);
                setModalVisible(true);
            }
        }, 500);
    };

    // Handle press out (cancel long press)
    const handlePressOut = () => {
        if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
        }
    };

    const handleGoToToday = () => {
        // Navigate to Home tab
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Main',
                        state: {
                            routes: [{ name: 'Home' }],
                        },
                    },
                ],
            })
        );
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
                <VStack alignItems="center">
                    <Text color="text.secondary" fontSize="lg" fontWeight="normal">
                        Semana {weekNumber}
                    </Text>
                    <Text color="text.tertiary" fontSize="xs">
                        {currentWeek?.dateRange || dateRange}
                    </Text>
                </VStack>

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
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <VStack px={4} space={5}>
                    {/* Objective Section */}
                    <VStack space={3}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color="text.secondary" fontSize="sm">
                                Objetivo da semana
                            </Text>
                            <Box
                                bg="accent.400"
                                borderRadius="full"
                                px={3}
                                py={1}
                            >
                                <Text color="background.primary" fontSize="xs" fontWeight="semibold">
                                    {weekProgress}% concluído
                                </Text>
                            </Box>
                        </HStack>

                        {/* Objective Card */}
                        <WeekObjectiveCard
                            title={currentWeek?.title || 'Objetivo da Semana'}
                            description={currentWeek?.description || 'Complete as tarefas diárias'}
                            progress={weekProgress}
                        />
                    </VStack>

                    {/* Cronograma Section */}
                    <VStack space={4}>
                        <Text color="text.primary" fontSize="md" fontWeight="semibold">
                            Cronograma
                        </Text>

                        {/* Days List */}
                        <Box>
                            {daysData.length > 0 ? (
                                daysData.map((day, index) => (
                                    <Pressable
                                        key={`${day.dayNumber}-${index}`}
                                        onPress={() => handleDayPress(day)}
                                        onPressIn={() => handlePressIn(day)}
                                        onPressOut={handlePressOut}
                                        style={{ marginBottom: 21 }}
                                    >
                                        <DayRow
                                            dayName={day.dayName}
                                            dayNumber={day.dayNumber}
                                            taskCount={day.taskCount}
                                            status={day.status}
                                            statusLabel={day.statusLabel}
                                            isCurrent={day.isCurrent}
                                            onPress={() => handleDayPress(day)}
                                        />
                                    </Pressable>
                                ))
                            ) : (
                                <Box
                                    bg="background.secondary"
                                    borderRadius="xl"
                                    p={6}
                                    alignItems="center"
                                >
                                    <Text color="text.tertiary" fontSize="md" textAlign="center">
                                        Nenhuma tarefa agendada para esta semana.
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </VStack>
                </VStack>
            </ScrollView>

            {/* Bottom Button */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                px={4}
                py={4}
                bg="background.primary"
            >
                <Button
                    bg="accent.400"
                    borderRadius="2xl"
                    py={4}
                    _pressed={{ bg: 'accent.500' }}
                    _text={{
                        color: 'background.primary',
                        fontWeight: 'bold',
                        fontSize: 'md',
                    }}
                    onPress={handleGoToToday}
                >
                    Ver Tarefas de Hoje
                </Button>
            </Box>

            {/* Daily Task Modal */}
            {selectedDay && (
                <DailyTaskModal
                    visible={modalVisible}
                    onClose={() => {
                        setModalVisible(false);
                        setSelectedDay(null);
                    }}
                    dayName={selectedDay.dayName}
                    dayNumber={selectedDay.dayNumber}
                    tasks={selectedDay.tasks}
                    date={selectedDay.fullDate}
                />
            )}
        </SafeAreaView>
    );
}
