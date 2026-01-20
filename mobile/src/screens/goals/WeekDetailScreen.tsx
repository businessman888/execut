import React from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronBackIcon } from '../../components/icons/NavIcons';
import { WeekObjectiveCard, DayRow, DayStatus } from '../../components/week-detail';
import Svg, { Path } from 'react-native-svg';

type WeekDetailRouteParams = {
    WeekDetail: {
        weekNumber: number;
        dateRange: string;
        month: string;
    };
};

interface DayData {
    dayName: string;
    dayNumber: number;
    taskCount: number;
    status: DayStatus;
    statusLabel: string;
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

export function WeekDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<WeekDetailRouteParams, 'WeekDetail'>>();

    const { weekNumber = 2, dateRange = 'APR 08 - APR 14', month = 'Abril' } = route.params || {};

    // Mock data - will be replaced with API calls
    const mockObjective = {
        title: 'Launch Beta v2.0',
        description: 'Deploy to early adopters & collect feedback',
        progress: 65,
    };

    const mockDays: DayData[] = [
        {
            dayName: 'Seg',
            dayNumber: 22,
            taskCount: 5,
            status: 'completed',
            statusLabel: 'Completo',
            isCurrent: false,
        },
        {
            dayName: 'Ter',
            dayNumber: 24,
            taskCount: 3,
            status: 'current',
            statusLabel: 'Em progresso',
            isCurrent: true,
        },
        {
            dayName: 'Qua',
            dayNumber: 25,
            taskCount: 4,
            status: 'scheduled',
            statusLabel: 'Agendadas',
            isCurrent: false,
        },
        {
            dayName: 'Qui',
            dayNumber: 26,
            taskCount: 2,
            status: 'scheduled',
            statusLabel: 'Agendadas',
            isCurrent: false,
        },
        {
            dayName: 'Sex',
            dayNumber: 27,
            taskCount: 6,
            status: 'scheduled',
            statusLabel: 'Agendadas',
            isCurrent: false,
        },
        {
            dayName: 'Sab',
            dayNumber: 28,
            taskCount: 0,
            status: 'empty',
            statusLabel: '',
            isCurrent: false,
        },
    ];

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
                        Plano Semanal
                    </Text>
                    <Text color="text.tertiary" fontSize="xs">
                        {dateRange}
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
                                    Prioridade: Alta
                                </Text>
                            </Box>
                        </HStack>

                        {/* Objective Card */}
                        <WeekObjectiveCard
                            title={mockObjective.title}
                            description={mockObjective.description}
                            progress={mockObjective.progress}
                        />
                    </VStack>

                    {/* Cronograma Section */}
                    <VStack space={4}>
                        <Text color="text.primary" fontSize="md" fontWeight="semibold">
                            Cronograma
                        </Text>

                        {/* Days List */}
                        <Box>
                            {mockDays.map((day, index) => (
                                <Box
                                    key={index}
                                    style={{ marginBottom: 21 }}
                                >
                                    <DayRow
                                        dayName={day.dayName}
                                        dayNumber={day.dayNumber}
                                        taskCount={day.taskCount}
                                        status={day.status}
                                        statusLabel={day.statusLabel}
                                        isCurrent={day.isCurrent}
                                        onPress={() => console.log(`${day.dayName} ${day.dayNumber} pressed`)}
                                    />
                                </Box>
                            ))}
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
                    onPress={() => console.log('Ver Tarefas de Hoje pressed')}
                >
                    Ver Tarefas de Hoje
                </Button>
            </Box>
        </SafeAreaView>
    );
}
