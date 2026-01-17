import React from 'react';
import { Box, HStack, VStack, Text, Image, Pressable } from 'native-base';
import Svg, { Path } from 'react-native-svg';

interface LeaderboardUser {
    id: string;
    rank: number;
    name: string;
    avatar: string;
    streakDays: number;
    xp: number;
}

interface LeaderboardRowProps {
    user: LeaderboardUser;
    isCurrentUser?: boolean;
    onPress?: () => void;
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

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
    user,
    isCurrentUser = false,
    onPress,
}) => {
    return (
        <Pressable onPress={onPress}>
            <Box
                bg={isCurrentUser ? 'accent.600' : 'surface.primary'}
                borderRadius="2xl"
                borderWidth={1}
                borderColor={isCurrentUser ? 'accent.400' : 'border.default'}
                p={4}
            >
                <HStack alignItems="center" space={3}>
                    {/* Rank */}
                    <Text
                        color="text.secondary"
                        fontSize="lg"
                        fontWeight="bold"
                        w={8}
                        textAlign="center"
                    >
                        {String(user.rank).padStart(2, '0')}
                    </Text>

                    {/* Avatar */}
                    <Image
                        source={{ uri: user.avatar }}
                        alt={user.name}
                        size={12}
                        borderRadius="full"
                        bg="gray.600"
                    />

                    {/* Name and Streak */}
                    <VStack flex={1}>
                        <Text color="text.primary" fontSize="sm" fontWeight="medium">
                            {user.name}
                        </Text>
                        <HStack alignItems="center" space={1}>
                            <FireIcon size={14} color="#F97316" />
                            <Text color="#F97316" fontSize="xs">
                                {user.streakDays} dias de sequência
                            </Text>
                        </HStack>
                    </VStack>

                    {/* XP */}
                    <VStack alignItems="flex-end">
                        <Text
                            color={isCurrentUser ? 'accent.400' : 'text.primary'}
                            fontSize="md"
                            fontWeight="bold"
                        >
                            {user.xp.toLocaleString()}
                        </Text>
                        <Text color="text.tertiary" fontSize="xs">
                            XP total
                        </Text>
                    </VStack>
                </HStack>
            </Box>
        </Pressable>
    );
};
