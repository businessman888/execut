import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';

interface ScoreCardProps {
    score: number;
    percentageChange: number;
    isPositive?: boolean;
}

// Lightning bolt icon
const LightningIcon = ({ color = '#33CFFF', size = 40 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M13 2L4 14H11L10 22L19 10H12L13 2Z"
            fill={color}
            stroke={color}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const ScoreCard: React.FC<ScoreCardProps> = ({
    score,
    percentageChange,
    isPositive = true,
}) => {
    return (
        <Box
            bg="surface.primary"
            borderRadius="2xl"
            borderWidth={1}
            borderColor="border.default"
            p={4}
        >
            <HStack justifyContent="space-between" alignItems="center">
                <VStack>
                    <Text color="text.secondary" fontSize="sm">
                        Score de execução
                    </Text>
                    <Text color="text.primary" fontSize="4xl" fontWeight="bold">
                        {score}%
                    </Text>
                    <Text color={isPositive ? 'accent.400' : 'red.400'} fontSize="sm">
                        {isPositive ? '+' : ''}{percentageChange}% vs ontem
                    </Text>
                </VStack>

                <Box
                    bg="accent.400"
                    borderRadius="full"
                    p={3}
                >
                    <LightningIcon size={32} color="#0D0D0D" />
                </Box>
            </HStack>
        </Box>
    );
};
