import React from 'react';
import { Box, HStack, VStack, Text } from '../ui';
import { View } from 'react-native';

interface ActivityChartProps {
    data: number[];
    labels: string[];
    status: string;
}

const BAR_MAX_HEIGHT = 120;

export const ActivityChart: React.FC<ActivityChartProps> = ({
    data,
    labels,
    status,
}) => {
    const maxValue = Math.max(...data, 1);

    return (
        <Box
            bg="surface.primary"
            borderRadius={16}
            borderWidth={1}
            borderColor="#33CFFF"
            p={5}
            w={355}
            h={243}
        >
            {/* Header */}
            <Text color="#A0A0A0" fontSize={14} mb={1}>
                Atividade 7 dias
            </Text>
            <Text color="#FFFFFF" fontSize={18} fontWeight="semibold" mb={4}>
                Status: <Text color="#33CFFF" fontSize={18} fontWeight="bold">{status}</Text>
            </Text>

            {/* Chart Bars */}
            <HStack justifyContent="space-between" alignItems="flex-end" h={BAR_MAX_HEIGHT + 30}>
                {data.map((value, index) => {
                    const barHeight = Math.max((value / maxValue) * BAR_MAX_HEIGHT, 10);

                    return (
                        <VStack key={index} alignItems="center" justifyContent="flex-end" flex={1}>
                            {/* Bar */}
                            <View
                                style={{
                                    width: 28,
                                    height: barHeight,
                                    backgroundColor: '#33CFFF',
                                    borderRadius: 6,
                                    marginBottom: 8,
                                }}
                            />
                            {/* Label */}
                            <Text color="#6B7280" fontSize={12}>
                                {labels[index]}
                            </Text>
                        </VStack>
                    );
                })}
            </HStack>
        </Box>
    );
};
