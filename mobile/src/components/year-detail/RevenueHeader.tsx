import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

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
        >
            <VStack space={3}>
                {/* Top section with revenue and circular progress */}
                <HStack justifyContent="space-between" alignItems="flex-start">
                    <VStack>
                        <Text color="text.secondary" fontSize="xs">
                            Meta de faturamento
                        </Text>
                        <Text color="text.primary" fontSize="3xl" fontWeight="bold">
                            R$ {revenue}
                        </Text>
                        <Text color="accent.400" fontSize="xs">
                            +{percentageIncrease}% vs último ano
                        </Text>
                    </VStack>

                    {/* Circular Progress */}
                    <Box position="relative" alignItems="center" justifyContent="center">
                        <CircularProgress progress={progress} size={60} />
                        <Box position="absolute">
                            <Text color="text.primary" fontSize="xs" fontWeight="semibold">
                                {progress}%
                            </Text>
                        </Box>
                    </Box>
                </HStack>

                {/* Progress bar section */}
                <VStack space={1}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text color="text.secondary" fontSize="xs">
                            Atualmente
                        </Text>
                        <Text color="text.secondary" fontSize="xs">
                            R$ {currentRevenue}
                        </Text>
                    </HStack>

                    {/* Linear progress bar */}
                    <Box w="100%" h={2} bg="surface.tertiary" borderRadius="full" overflow="hidden">
                        <View style={[styles.progressBar, { width: `${progress}%` }]}>
                            <LinearGradient
                                colors={['#33CFFF', '#00A3CC']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            />
                        </View>
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
