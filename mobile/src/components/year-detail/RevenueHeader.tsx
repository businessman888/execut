import React from 'react';
import { Box, HStack, VStack, Text } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface RevenueHeaderProps {
    revenue: string;
    percentageIncrease: number;
    currentRevenue: string;
    progress: number; // 0-100
}

// Circular Progress Component
const CircularProgress: React.FC<{ progress: number; size: number }> = ({ progress, size }) => {
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#374151"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Progress circle */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#33CFFF"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </Svg>
    );
};

export const RevenueHeader: React.FC<RevenueHeaderProps> = ({
    revenue,
    percentageIncrease,
    currentRevenue,
    progress,
}) => {
    return (
        <Box
            bg="surface.primary"
            borderRadius="2xl"
            borderWidth={1}
            borderColor="border.default"
            p={4}
            w={355}
            h={197}
        >
            <VStack h="100%" justifyContent="space-between" py={2}>
                {/* Top section with revenue and circular progress */}
                <HStack justifyContent="space-between" alignItems="flex-start">
                    <VStack space={1}>
                        <Text color="#9CA3AF" fontSize={14}>
                            Meta de faturamento
                        </Text>
                        <Text color="#33CFFF" fontSize={32} fontWeight="bold" lineHeight={38}>
                            R$ {revenue}
                        </Text>
                        <Text color="#33CFFF" fontSize={12}>
                            +{percentageIncrease}% vs Último ano
                        </Text>
                    </VStack>

                    {/* Circular Progress */}
                    <Box position="relative" alignItems="center" justifyContent="center" mt={2}>
                        <CircularProgress progress={progress} size={58.33} />
                        <Box position="absolute">
                            <Text color="#33CFFF" fontSize="xs" fontWeight="semibold">
                                {progress}%
                            </Text>
                        </Box>
                    </Box>
                </HStack>

                {/* Progress Bar */}
                <VStack space={2}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text color="text.secondary" fontSize={14}>
                            Atualmente
                        </Text>
                        <Text color="text.secondary" fontSize={14}>
                            R$ {currentRevenue}
                        </Text>
                    </HStack>
                    <Box
                        w="100%"
                        h={7}
                        bg="surface.tertiary"
                        borderRadius="full"
                        overflow="hidden"
                    >
                        <Box w={`${progress}%`} h="100%" overflow="hidden">
                            <LinearGradient
                                colors={['#33CFFF', '#475FAF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ flex: 1 }}
                            />
                        </Box>
                    </Box>
                </VStack>
            </VStack>
        </Box>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        height: '100%',
        borderRadius: 999,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
    },
});
