import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export type DayStatus = 'completed' | 'current' | 'scheduled' | 'empty';

interface DayRowProps {
    dayName: string;
    dayNumber: number;
    taskCount: number;
    status: DayStatus;
    statusLabel: string;
    isCurrent?: boolean;
    onPress?: () => void;
}

// Checkmark icon
const CheckmarkIcon = ({ size = 24 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} fill="#374151" />
        <Path
            d="M8 12L11 15L16 9"
            stroke="#9CA3AF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Arrow right icon
const ArrowRightIcon = ({ size = 24, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 18L15 12L9 6"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Calendar icon
const CalendarIcon = ({ size = 24, color = '#6B7280' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x={3} y={4} width={18} height={18} rx={2} stroke={color} strokeWidth={1.5} fill="none" />
        <Path d="M16 2V6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M8 2V6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M3 10H21" stroke={color} strokeWidth={1.5} />
    </Svg>
);

const getStatusColor = (status: DayStatus): string => {
    switch (status) {
        case 'completed':
            return '#9CA3AF';
        case 'current':
            return '#33CFFF';
        case 'scheduled':
            return '#9CA3AF';
        case 'empty':
            return '#6B7280';
        default:
            return '#6B7280';
    }
};

export const DayRow: React.FC<DayRowProps> = ({
    dayName,
    dayNumber,
    taskCount,
    status,
    statusLabel,
    isCurrent = false,
    onPress,
}) => {
    const renderIcon = () => {
        if (status === 'completed') {
            return <CheckmarkIcon size={28} />;
        } else if (status === 'current') {
            return <ArrowRightIcon size={28} color="#33CFFF" />;
        } else if (status === 'scheduled') {
            return <CalendarIcon size={24} color="#6B7280" />;
        }
        return null;
    };

    const isClickable = status === 'current' || status === 'completed' || status === 'scheduled';

    return (
        <HStack alignItems="center" space={3}>
            {/* Day indicator */}
            <VStack alignItems="center" w={10}>
                <Text
                    color={isCurrent ? 'accent.400' : 'text.secondary'}
                    fontSize="xs"
                    fontWeight={isCurrent ? 'bold' : 'normal'}
                >
                    {dayName}
                </Text>
                {isCurrent ? (
                    <Box
                        bg="accent.400"
                        borderRadius="full"
                        w={6}
                        h={6}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text color="background.primary" fontSize="xs" fontWeight="bold">
                            {dayNumber}
                        </Text>
                    </Box>
                ) : (
                    <Text color="text.secondary" fontSize="sm">
                        {dayNumber}
                    </Text>
                )}
            </VStack>

            {/* Timeline line */}
            <Box w={0.5} h="100%" bg="border.default" position="absolute" left={10} />

            {/* Task Card */}
            <Pressable
                flex={1}
                onPress={isClickable ? onPress : undefined}
                disabled={!isClickable}
            >
                <Box
                    bg={isCurrent ? 'surface.primary' : 'surface.secondary'}
                    borderRadius="xl"
                    borderWidth={isCurrent ? 1 : 0}
                    borderColor={isCurrent ? 'accent.400' : 'transparent'}
                    p={4}
                >
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                            {status === 'empty' ? (
                                <Text color="text.tertiary" fontSize="sm">
                                    Sem tarefas agendadas
                                </Text>
                            ) : (
                                <>
                                    <Text
                                        color={isCurrent ? 'accent.400' : 'text.primary'}
                                        fontSize="md"
                                        fontWeight={isCurrent ? 'semibold' : 'normal'}
                                    >
                                        {taskCount} tarefas
                                    </Text>
                                    <Text color={getStatusColor(status)} fontSize="xs">
                                        {statusLabel}
                                    </Text>
                                </>
                            )}
                        </VStack>
                        {renderIcon()}
                    </HStack>
                </Box>
            </Pressable>
        </HStack>
    );
};
