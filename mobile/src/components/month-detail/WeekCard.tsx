import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export type WeekStatus = 'completed' | 'current' | 'pending';

interface WeekCardProps {
    weekNumber: number;
    dateRange: string;
    title: string;
    description: string;
    status: WeekStatus;
    progress: number;
    isCurrent?: boolean;
    onPress?: () => void;
}

// Checkmark icon for completed status
const CheckmarkIcon = ({ size = 20 }: { size?: number }) => (
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

const getStatusLabel = (status: WeekStatus): string => {
    switch (status) {
        case 'completed':
            return 'Concluído';
        case 'current':
            return 'Em andamento';
        case 'pending':
            return 'Pendente';
        default:
            return '';
    }
};

const getStatusColor = (status: WeekStatus): string => {
    switch (status) {
        case 'completed':
            return '#34D399';
        case 'current':
            return '#33CFFF';
        case 'pending':
            return '#6B7280';
        default:
            return '#6B7280';
    }
};

export const WeekCard: React.FC<WeekCardProps> = ({
    weekNumber,
    dateRange,
    title,
    description,
    status,
    progress,
    isCurrent = false,
    onPress,
}) => {
    const isCompleted = status === 'completed';
    const cardBg = isCurrent ? 'surface.primary' : 'surface.secondary';
    const borderColor = isCurrent ? 'accent.400' : 'border.default';

    return (
        <Pressable onPress={onPress}>
            <Box
                bg={cardBg}
                borderRadius="xl"
                borderWidth={isCurrent ? 1 : 0}
                borderColor={borderColor}
                overflow="hidden"
            >
                {/* Week Header */}
                <HStack
                    bg={isCurrent ? 'accent.400' : 'surface.tertiary'}
                    px={4}
                    py={2}
                    alignItems="center"
                    space={2}
                >
                    <Box
                        bg={isCurrent ? 'background.primary' : 'surface.secondary'}
                        borderRadius="lg"
                        px={2}
                        py={1}
                    >
                        <Text
                            color={isCurrent ? 'accent.400' : 'text.secondary'}
                            fontSize="xs"
                            fontWeight="bold"
                        >
                            {String(weekNumber).padStart(2, '0')}
                        </Text>
                    </Box>
                    <Text
                        color={isCurrent ? 'background.primary' : 'text.secondary'}
                        fontSize="sm"
                        fontWeight={isCurrent ? 'semibold' : 'normal'}
                    >
                        {isCurrent ? 'Semana atual - ' : 'Semana ' + weekNumber + ' - '}
                        {dateRange}
                    </Text>
                    {isCompleted && (
                        <Box ml="auto">
                            <CheckmarkIcon size={20} />
                        </Box>
                    )}
                </HStack>

                {/* Week Content */}
                <VStack p={4} space={3}>
                    {/* Title and Description */}
                    <VStack space={1}>
                        <Text color="text.primary" fontSize="md" fontWeight="semibold">
                            {title}
                        </Text>
                        <Text color="text.secondary" fontSize="sm">
                            {description}
                        </Text>
                    </VStack>

                    {/* Status and Progress */}
                    <VStack space={2}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color={getStatusColor(status)} fontSize="xs">
                                {getStatusLabel(status)}
                            </Text>
                            <Text
                                color={status === 'current' ? 'accent.400' : 'text.secondary'}
                                fontSize="xs"
                                fontWeight="bold"
                            >
                                {progress}%
                            </Text>
                        </HStack>

                        {/* Progress Bar */}
                        <Box
                            w="100%"
                            h={1.5}
                            bg="rgba(255,255,255,0.1)"
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
