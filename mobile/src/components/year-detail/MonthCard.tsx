import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from '../ui';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

export type MonthStatus = 'completed' | 'in_progress' | 'pending' | 'inactive';

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

// Progress circle for in_progress status
const ProgressCircleIcon = ({ size = 24, progress = 0 }: { size?: number; progress?: number }) => {
    const radius = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            {/* Background circle */}
            <Circle
                cx={12}
                cy={12}
                r={radius}
                stroke="#374151"
                strokeWidth={2}
                fill="none"
            />
            {/* Progress circle */}
            <Circle
                cx={12}
                cy={12}
                r={radius}
                stroke="#00C3FF"
                strokeWidth={2}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 12 12)"
            />
        </Svg>
    );
};

// Empty circle for pending status
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
            return 'Concluído';
        case 'in_progress':
            return 'Ativo';
        case 'pending':
            return 'Bloqueado';
        case 'inactive':
            return 'Inativo';
        default:
            return '';
    }
};

const getStatusColor = (status: MonthStatus): string => {
    switch (status) {
        case 'completed':
            return '#34D399';
        case 'in_progress':
            return '#00C3FF';
        case 'pending':
            return '#6B7280';
        case 'inactive':
            return '#4B5563';
        default:
            return '#6B7280';
    }
};

export const MonthCard: React.FC<MonthCardProps> = ({
    month,
    status,
    progress,
    onPress,
}) => {
    const isCompleted = status === 'completed';
    const isActive = status === 'in_progress';
    const isInactive = status === 'inactive';
    const isPending = status === 'pending';

    // Card styling based on status
    const cardBg = isActive ? 'surface.primary' : (isInactive ? '#1A1A1A' : 'surface.secondary');
    const cardBorderColor = isActive ? '#00C3FF' : (isCompleted ? '#34D399' : 'border.subtle');
    const cardOpacity = isInactive ? 0.5 : 1;

    // Render the appropriate icon based on status
    const renderStatusIcon = () => {
        switch (status) {
            case 'completed':
                return <CheckmarkIcon size={24} />;
            case 'in_progress':
                return <ProgressCircleIcon size={24} progress={progress} />;
            case 'inactive':
                return <Ionicons name="remove-circle-outline" size={24} color="#4B5563" />;
            case 'pending':
            default:
                return <EmptyCircleIcon size={24} />;
        }
    };

    return (
        <Pressable onPress={onPress} style={{ opacity: cardOpacity }}>
            <Box
                bg={cardBg}
                borderRadius="xl"
                borderWidth={isActive ? 2 : 1}
                borderColor={cardBorderColor}
                p={3}
                w={167}
                h={102}
            >
                <VStack space={2} justifyContent="space-between" h="100%">
                    {/* Month and status icon */}
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text
                            color={isInactive ? '#6B7280' : 'text.primary'}
                            fontSize="md"
                            fontWeight="bold"
                        >
                            {month}
                        </Text>
                        {renderStatusIcon()}
                    </HStack>

                    <VStack space={1}>
                        {/* Status and progress */}
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color={getStatusColor(status)} fontSize="xs">
                                {getStatusLabel(status)}
                            </Text>
                            <Text
                                color={isInactive ? '#6B7280' : 'text.primary'}
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
                                bg={getStatusColor(status)}
                                borderRadius="full"
                            />
                        </Box>
                    </VStack>
                </VStack>
            </Box>
        </Pressable>
    );
};
