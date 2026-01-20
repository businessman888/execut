import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from '../ui';
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

// Simple Check mark stroke icon
const CheckStrokeIcon = ({ size = 14, color = '#E5E7EB' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 14 10" fill="none">
        <Path
            d="M1 5L4.5 9L13 1"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const DayRow: React.FC<DayRowProps> = ({
    dayName,
    dayNumber,
    taskCount,
    status,
    statusLabel,
    isCurrent = false,
    onPress,
}) => {
    const isCompleted = status === 'completed';
    const isScheduled = status === 'scheduled' || status === 'empty';

    // Determine Circle Styles based on status
    const getCircleStyles = () => {
        if (isCurrent) {
            return {
                bg: '#33CFFF',
                borderColor: '#33CFFF',
                textColor: '#111111',
                borderWidth: 0
            };
        } else if (isCompleted) {
            return {
                bg: 'transparent', // Or #111111
                borderColor: '#404040',
                textColor: '#E5E7EB',
                borderWidth: 1
            };
        } else {
            // Scheduled / Empty
            return {
                bg: 'transparent',
                borderColor: '#404040',
                textColor: '#9CA3AF',
                borderWidth: 1
            };
        }
    };

    const styles = getCircleStyles();
    const isClickable = status === 'current' || status === 'completed' || status === 'scheduled';

    const renderDayContent = () => {
        if (isCompleted) {
            return <CheckStrokeIcon color="#E5E7EB" />;
        }
        return (
            <Text
                color={styles.textColor}
                fontSize="md"
                fontWeight="bold"
            >
                {dayNumber}
            </Text>
        );
    };

    const renderIcon = () => {
        if (status === 'current') {
            return <ArrowRightIcon size={28} color="#33CFFF" />;
        } else if (status === 'scheduled') {
            return <CalendarIcon size={24} color="#6B7280" />;
        }
        return null;
    };

    return (
        <HStack alignItems="center" space={4} w="100%" position="relative">
            {/* Timeline Column */}
            <VStack alignItems="center" width="46px" position="relative">
                {/* Day Name */}
                <Text
                    color={isCurrent ? '#33CFFF' : '#9CA3AF'}
                    fontSize="xs"
                    fontWeight="medium"
                    mb={1} // Space between text and circle
                    zIndex={2}
                    bg="#0D0D0D"
                >
                    {dayName}
                </Text>

                {/* Connecting Line */}
                <Box
                    position="absolute"
                    top={6}
                    bottom={-30}
                    w="1px"
                    bg="#404040"
                    zIndex={0}
                    left="50%"
                    style={{ transform: [{ translateX: -0.5 }] }}
                />

                {/* Day Circle Node */}
                <Box
                    w="46px"
                    h="46px"
                    borderRadius="full"
                    borderWidth={styles.borderWidth}
                    borderColor={styles.borderColor}
                    bg={isCurrent ? styles.bg : '#0D0D0D'}
                    alignItems="center"
                    justifyContent="center"
                    zIndex={1}
                >
                    {renderDayContent()}
                </Box>
            </VStack>

            {/* Task Card */}
            <Pressable
                flex={1}
                onPress={isClickable ? onPress : undefined}
                disabled={!isClickable}
            >
                <Box
                    bg={isCurrent ? 'rgba(51, 207, 255, 0.05)' : '#111111'}
                    borderRadius="2xl"
                    borderWidth={1}
                    borderColor={isCurrent ? '#33CFFF' : '#404040'}
                    p={0}
                    w={279}
                    h={76}
                    justifyContent="center"
                    overflow="hidden"
                >
                    <HStack px={4} alignItems="center" justifyContent="space-between" w="100%" h="100%">
                        <VStack justifyContent="center">
                            {status === 'empty' ? (
                                <Text color="text.tertiary" fontSize="sm">
                                    Sem tarefas agendadas
                                </Text>
                            ) : (
                                <>
                                    <Text
                                        color={isCurrent ? '#33CFFF' : 'text.primary'}
                                        fontSize="md"
                                        fontWeight={isCurrent ? 'bold' : 'medium'}
                                    >
                                        {taskCount} tarefas
                                    </Text>
                                    <Text color={getStatusColor(status)} fontSize="xs">
                                        {statusLabel}
                                    </Text>
                                </>
                            )}
                        </VStack>

                        {/* Right Icon on Card */}
                        <Box>
                            {renderIcon()}
                        </Box>
                    </HStack>
                </Box>
            </Pressable>
        </HStack>
    );
};
