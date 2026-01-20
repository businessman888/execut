import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import { Dimensions } from 'react-native';

interface ActivityChartProps {
    data: number[];
    labels: string[];
    status: string;
}

const BAR_MAX_HEIGHT = 150;

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
            borderColor="#33CFFF"
            p={5}
            width="355px"
            height="243px"
            justifyContent="space-between"
        >
            <VStack>
                {/* Header */}
                <VStack mb="11px">
                    <Text color="#A0A0A0" fontSize="sm">
                        Atividade 7 dias
                    </Text>
                </VStack>
                <Text color="#FFFFFF" fontSize="18px" fontWeight="semibold">
                    Status: <Text color="#33CFFF">{status}</Text>
                </Text>

                {/* Chart */}
                <HStack justifyContent="space-between" alignItems="flex-end" h={BAR_MAX_HEIGHT + 20} mt={4}>
                    {data.map((value, index) => {
                        const barHeight = (value / maxValue) * BAR_MAX_HEIGHT;

                        return (
                            <VStack key={index} alignItems="center" justifyContent="flex-end" h="100%">
                                <Box
                                    w="25px"
                                    h={`${barHeight}px`}
                                    minH="10px"
                                    bg="#33CFFF"
                                    borderRadius={4}
                                    mb={2}
                                />
                                <Text color="#A0A0A0" fontSize="2xs">
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
