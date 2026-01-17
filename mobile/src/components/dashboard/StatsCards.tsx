import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';

interface StatsCardsProps {
    totalXP: number;
    xpChange: string;
    streakDays: number;
    recordDays: number;
}

// Trophy icon
const TrophyIcon = ({ color = '#33CFFF', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M8 21H16M12 17V21M6 4H18M6 4C6 4 4 4 4 6C4 8 4 10 6 10M6 4V10M18 4C18 4 20 4 20 6C20 8 20 10 18 10M18 4V10M6 10C6 10 6 14 12 17M6 10H18M18 10C18 10 18 14 12 17"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Fire icon
const FireIcon = ({ color = '#33CFFF', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12 22C14.2091 22 16 20.2091 16 18C16 15.7909 12 12 12 12C12 12 8 15.7909 8 18C8 20.2091 9.79086 22 12 22Z"
            fill={color}
        />
    </Svg>
);

export const StatsCards: React.FC<StatsCardsProps> = ({
    totalXP,
    xpChange,
    streakDays,
    recordDays,
}) => {
    return (
        <HStack space={3}>
            {/* XP Card */}
            <Box
                flex={1}
                bg="surface.primary"
                borderRadius="2xl"
                borderWidth={1}
                borderColor="border.default"
                p={4}
            >
                <HStack space={2} alignItems="flex-start">
                    <Box
                        bg="surface.secondary"
                        borderRadius="full"
                        p={2}
                    >
                        <TrophyIcon size={20} color="#33CFFF" />
                    </Box>
                    <VStack>
                        <Text color="text.secondary" fontSize="xs">
                            Total de XP
                        </Text>
                        <Text color="text.primary" fontSize="xl" fontWeight="bold">
                            {totalXP.toLocaleString()}
                        </Text>
                        <Text color="accent.400" fontSize="2xs">
                            {xpChange}
                        </Text>
                    </VStack>
                </HStack>
            </Box>

            {/* Streak Card */}
            <Box
                flex={1}
                bg="surface.primary"
                borderRadius="2xl"
                borderWidth={1}
                borderColor="border.default"
                p={4}
            >
                <HStack space={2} alignItems="flex-start">
                    <Box
                        bg="surface.secondary"
                        borderRadius="full"
                        p={2}
                    >
                        <FireIcon size={20} color="#33CFFF" />
                    </Box>
                    <VStack>
                        <Text color="text.secondary" fontSize="xs">
                            Streak Atual
                        </Text>
                        <Text color="text.primary" fontSize="xl" fontWeight="bold">
                            {streakDays} Dias
                        </Text>
                        <Text color="text.tertiary" fontSize="2xs">
                            Recorde: {recordDays} dias
                        </Text>
                    </VStack>
                </HStack>
            </Box>
        </HStack>
    );
};
