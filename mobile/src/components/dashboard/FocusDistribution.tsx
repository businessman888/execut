import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import Svg, { Circle, G } from 'react-native-svg';

interface FocusItem {
    label: string;
    percentage: number;
    color: string;
}

interface FocusDistributionProps {
    items: FocusItem[];
}

// Simple pie chart using SVG circles
const PieChart: React.FC<{ items: FocusItem[]; size: number }> = ({ items, size }) => {
    const radius = size / 2 - 10;
    const centerX = size / 2;
    const centerY = size / 2;
    const circumference = 2 * Math.PI * radius;

    let cumulativePercentage = 0;

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {items.map((item, index) => {
                const strokeDasharray = circumference;
                const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
                const rotation = cumulativePercentage * 3.6 - 90; // Convert percentage to degrees
                cumulativePercentage += item.percentage;

                return (
                    <Circle
                        key={index}
                        cx={centerX}
                        cy={centerY}
                        r={radius}
                        stroke={item.color}
                        strokeWidth={20}
                        fill="none"
                        strokeDasharray={`${(item.percentage / 100) * circumference} ${circumference}`}
                        strokeLinecap="round"
                        transform={`rotate(${rotation} ${centerX} ${centerY})`}
                    />
                );
            })}
            {/* Inner circle for donut effect */}
            <Circle
                cx={centerX}
                cy={centerY}
                r={radius - 15}
                fill="#1A1A1A"
            />
        </Svg>
    );
};

export const FocusDistribution: React.FC<FocusDistributionProps> = ({ items }) => {
    return (
        <Box
            bg="surface.primary"
            borderRadius="2xl"
            borderWidth={1}
            borderColor="border.default"
            p={4}
        >
            <VStack space={4}>
                <Text color="text.primary" fontSize="md" fontWeight="semibold">
                    Distribuição de Foco
                </Text>

                <HStack justifyContent="space-between" alignItems="center">
                    {/* Pie Chart */}
                    <Box>
                        <PieChart items={items} size={100} />
                    </Box>

                    {/* Legend */}
                    <VStack space={2} flex={1} ml={4}>
                        {items.map((item, index) => (
                            <HStack key={index} justifyContent="space-between" alignItems="center">
                                <HStack space={2} alignItems="center">
                                    <Box
                                        w={3}
                                        h={3}
                                        borderRadius="full"
                                        bg={item.color}
                                    />
                                    <Text color="text.secondary" fontSize="sm">
                                        {item.label}
                                    </Text>
                                </HStack>
                                <Text color="text.primary" fontSize="sm" fontWeight="semibold">
                                    {item.percentage}%
                                </Text>
                            </HStack>
                        ))}
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};
