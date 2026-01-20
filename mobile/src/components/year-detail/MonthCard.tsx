import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { CheckBlueIcon } from '../icons/NavIcons';

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
        <Pressable onPress={onPress}>
            <Box
                bg={isActive ? 'surface.primary' : 'surface.secondary'}
                borderRadius="xl"
                borderWidth={1}
                borderColor={isActive ? 'border.default' : 'border.subtle'}
                p={3}
                w={167}
                h={102}
            >
                <VStack space={2} justifyContent="space-between" h="100%">
                    {/* Month and status icon */}
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text
                            color="text.primary"
                            fontSize="md"
                            fontWeight="bold"
                        >
                            {month}
                        </Text>
                        {(isCompleted || status === 'in_progress') ? (
                            <CheckBlueIcon size={24} color="#34D399" />
                        ) : (
                            <EmptyCircleIcon size={24} />
                        )}
                    </HStack>

                    <VStack space={1}>
                        {/* Status and progress */}
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color="#9CA3AF" fontSize="xs">
                                {status === 'in_progress' ? 'Completed' : getStatusLabel(status)}
                            </Text>
                            <Text
                                color="text.primary"
                                fontSize="xs"
                                fontWeight="bold"
                            >
                                {progress}%
                            </Text>
                        </HStack>

                        {/* Progress bar */}
                        <Box
                            w="100%"
                            h={2}
                            bg="surface.tertiary"
                            borderRadius="full"
                            overflow="hidden"
                        >
                            <Box
                                w={`${progress}%`}
                                h="100%"
                                bg="#34D399"
                                borderRadius="full"
                            />
                        </Box>
                    </VStack>
                </VStack>
            </Box>
        </Pressable>
    );
};
