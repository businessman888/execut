import React from 'react';
import { Box, HStack, VStack, Text, Image } from 'native-base';
import Svg, { Path } from 'react-native-svg';

interface CurrentUserCardProps {
    rank: number;
    name: string;
    avatar: string;
    streakDays: number;
    xp: number;
}

// Fire icon for streak
const FireIcon = ({ color = '#F97316', size = 14 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
            fill={color}
        />
    </Svg>
);

export const CurrentUserCard: React.FC<CurrentUserCardProps> = ({
    rank,
    name,
    avatar,
    streakDays,
    xp,
}) => {
    return (
        <Box
            bg="accent.600"
            borderTopRadius="2xl"
            borderTopWidth={2}
            borderTopColor="accent.400"
            p={4}
        >
            <HStack alignItems="center" space={3}>
                {/* Rank */}
                <Text
                    color="accent.400"
                    fontSize="lg"
                    fontWeight="bold"
                    w={8}
                    textAlign="center"
                >
                    {String(rank).padStart(2, '0')}
                </Text>

                {/* Avatar */}
                <Box position="relative">
                    <Image
                        source={{ uri: avatar }}
                        alt={name}
                        size={12}
                        borderRadius="full"
                        borderWidth={2}
                        borderColor="accent.400"
                        bg="gray.600"
                    />
                </Box>

                {/* Name and Streak */}
                <VStack flex={1}>
                    <Text color="text.primary" fontSize="sm" fontWeight="medium">
                        {name}
                    </Text>
                    <HStack alignItems="center" space={1}>
                        <FireIcon size={14} color="#F97316" />
                        <Text color="#F97316" fontSize="xs">
                            {streakDays} dias de sequência
                        </Text>
                    </HStack>
                </VStack>

                {/* XP */}
                <VStack alignItems="flex-end">
                    <Text color="accent.400" fontSize="md" fontWeight="bold">
                        {xp.toLocaleString()}
                    </Text>
                    <Text color="text.tertiary" fontSize="xs">
                        XP total
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};
