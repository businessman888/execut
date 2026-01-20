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
const FireIcon = ({ color = '#FF8C61', size = 14 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
            fill={color}
            fillOpacity={0.2}
            stroke={color}
            strokeWidth={1.5}
        />
        <Path d="M12 18V12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M12 12L15 15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        {/* Note: Switched to simple fire shape or similar from previous component if available, but using generic Fire shape for now matching previous usage in spirit but refined */}
        <Path
            d="M12 22C14.2091 22 16 20.2091 16 18C16 15.7909 12 12 12 12C12 12 8 15.7909 8 18C8 20.2091 9.79086 22 12 22Z"
            fill={color}
        />
    </Svg>
);

// Specific Fire Icon matching previous usage/design better?
// Reusing logic from StatsCards for consistency or simple new path
const SimpleFireIcon = ({ color = '#FF8C61', size = 14 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C14.2091 22 16 20.2091 16 18C16 15.7909 12 12 12 12C12 12 8 15.7909 8 18C8 20.2091 9.79086 22 12 22Z"
            fill={color}
        />
        <Path
            d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
            stroke={color}
            strokeWidth={1.5}
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
                bg="#0D0D0D"
                borderRadius="2xl"
                borderWidth={1}
                borderColor="#262626"
                p={4}
            >
                <HStack alignItems="center" space={4}>
                    {/* Rank Position */}
                    <Text color="#A3A3A3" fontSize="lg" fontWeight="normal" width={8} textAlign="center">
                        {String(user.rank).padStart(2, '0')}
                    </Text>

                    {/* User Info */}
                    <HStack space={3} alignItems="center" flex={1}>
                        {/* Avatar */}
                        <Image
                            source={{ uri: user.avatar }}
                            alt={user.name}
                            size={45}
                            borderRadius={100} // Force rounded using number
                            style={{ borderRadius: 100 }} // Explicit style override
                            bg="gray.800"
                        />
                        <VStack>
                            <Text color="white" fontSize="md" fontWeight="bold">
                                {user.name}
                            </Text>
                        </VStack>

                        {/* XP */}
                        <VStack alignItems="flex-end" space={0.5} ml="auto">
                            <Text
                                color="white"
                                fontSize="md"
                                fontWeight="bold"
                            >
                                {user.xp.toLocaleString().replace(',', '.')}
                            </Text>
                            <Text color="#A3A3A3" fontSize="xs">
                                XP total
                            </Text>
                        </VStack>
                    </HStack>
                </HStack>
            </Box>
        </Pressable>
    );
};
