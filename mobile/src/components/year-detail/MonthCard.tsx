import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

export type MonthStatus = 'completed' | 'in_progress' | 'pending';

interface MonthCardProps {
    month: string;
    status: MonthStatus;
    progress: number;
    onPress?: () => void;
}

// Checkmark icon for completed status
const CheckmarkIcon = ({ size = 24 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} fill="#34D399" />
        <Path
            d="M8 12L11 15L16 9"
            stroke="#0D0D0D"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Empty circle for pending/in-progress status
const EmptyCircleIcon = ({ size = 24 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle
            cx={12}
            cy={12}
            r={10}
            stroke="#6B7280"
            strokeWidth={1.5}
            fill="none"
        />
    </Svg>
);

const getStatusLabel = (status: MonthStatus): string => {
    switch (status) {
        case 'completed':
            return 'Completed';
        case 'in_progress':
            return 'In Progress';
        case 'pending':
            return 'Pending';
        default:
            return '';
    }
};

const getStatusColor = (status: MonthStatus): string => {
    switch (status) {
        case 'completed':
            return '#9CA3AF';
        case 'in_progress':
            return '#33CFFF';
        case 'pending':
            return '#6B7280';
        default:
            return '#6B7280';
    }
};

const getProgressColor = (status: MonthStatus): string => {
    switch (status) {
        case 'completed':
            return '#34D399';
        case 'in_progress':
            return '#33CFFF';
        case 'pending':
            return '#374151';
        default:
            return '#374151';
    }
};

export const MonthCard: React.FC<MonthCardProps> = ({
    month,
    status,
    progress,
    onPress,
}) => {
    const isCompleted = status === 'completed';
    const isActive = status === 'completed' || status === 'in_progress';

    return (
        <Pressable onPress={onPress} flex={1}>
            <Box
                bg={isActive ? 'surface.primary' : 'surface.secondary'}
                borderRadius="xl"
                borderWidth={1}
                borderColor={isActive ? 'border.default' : 'border.subtle'}
                p={3}
                minH={20}
            >
                <VStack space={2}>
                    {/* Month and status icon */}
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text
                            color="text.primary"
                            fontSize="md"
                            fontWeight={isActive ? 'semibold' : 'normal'}
                        >
                            {month}
                        </Text>
                        {isCompleted ? (
                            <CheckmarkIcon size={24} />
                        ) : (
                            <EmptyCircleIcon size={24} />
                        )}
                    </HStack>

                    {/* Status and progress */}
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text color={getStatusColor(status)} fontSize="xs">
                            {getStatusLabel(status)}
                        </Text>
                        <Text
                            color={status === 'in_progress' ? 'accent.400' : 'text.secondary'}
                            fontSize="xs"
                            fontWeight="semibold"
                        >
                            {progress}%
                        </Text>
                    </HStack>

                    {/* Progress bar */}
                    <Box
                        w="100%"
                        h={1}
                        bg="rgba(255,255,255,0.1)"
                        borderRadius="full"
                        overflow="hidden"
                    >
                        <Box
                            w={`${progress}%`}
                            h="100%"
                            bg={getProgressColor(status)}
                            borderRadius="full"
                        />
                    </Box>
                </VStack>
            </Box>
        </Pressable>
    );
};
