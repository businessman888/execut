import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import { Dimensions } from 'react-native';

interface ActivityChartProps {
    data: number[];
    labels: string[];
    status: string;
}

const BAR_MAX_HEIGHT = 80;

export const ActivityChart: React.FC<ActivityChartProps> = ({
    data,
    labels,
    status,
}) => {
    const maxValue = Math.max(...data, 1);

    return (
        <Box
            bg="surface.primary"
            borderRadius="2xl"
            borderWidth={1}
            borderColor="border.default"
            p={4}
        >
            <VStack space={3}>
                {/* Header */}
                <VStack>
                    <Text color="text.secondary" fontSize="sm">
                        Atividade 7 dias
                    </Text>
                    <Text color="text.primary" fontSize="md" fontWeight="semibold">
                        Status: <Text color="accent.400">{status}</Text>
                    </Text>
                </VStack>

                {/* Chart */}
                <HStack justifyContent="space-between" alignItems="flex-end" h={BAR_MAX_HEIGHT + 20} mt={2}>
                    {data.map((value, index) => {
                        const barHeight = (value / maxValue) * BAR_MAX_HEIGHT;
                        const isHighest = value === maxValue;

                        return (
                            <VStack key={index} alignItems="center" flex={1}>
                                <Box
                                    w={5}
                                    h={barHeight || 4}
                                    bg={isHighest ? 'accent.400' : 'accent.600'}
                                    borderRadius="sm"
                                    mb={2}
                                />
                                <Text color="text.tertiary" fontSize="2xs">
                                    {labels[index]}
                                </Text>
                            </VStack>
                        );
                    })}
                </HStack>
            </VStack>
        </Box>
    );
};
