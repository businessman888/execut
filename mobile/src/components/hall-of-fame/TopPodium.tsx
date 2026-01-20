
import React from 'react';
import { Box, HStack, Text, Image } from 'native-base';

interface TopUser {
    id: string;
    name: string;
    avatar: string;
    level: number;
    rank: 1 | 2 | 3;
    title?: string;
}

interface TopPodiumProps {
    users: TopUser[];
}

// Rank badge with number
const RankBadge: React.FC<{ rank: 1 | 2 | 3; size?: number }> = ({ rank, size = 6 }) => {
    return (
        <Box
            position="absolute"
            bottom={0}
            right={0}
            bg="#33CFFF"
            borderRadius="full"
            w={size}
            h={size}
            alignItems="center"
            justifyContent="center"
            borderWidth={2}
            borderColor="#0D0D0D"
        >
            <Text color="#0D0D0D" fontSize="xs" fontWeight="bold">
                {rank}
            </Text>
        </Box>
    );
};

export const TopPodium: React.FC<TopPodiumProps> = ({ users }) => {
    // Sort users by rank
    const sortedUsers = [...users].sort((a, b) => a.rank - b.rank);
    const first = sortedUsers.find(u => u.rank === 1);
    const second = sortedUsers.find(u => u.rank === 2);
    const third = sortedUsers.find(u => u.rank === 3);

    const renderFirstPlace = (user: TopUser | undefined) => {
        if (!user) return null;
        return (
            <Box
                bg="#0D0D0D"
                borderRadius={20}
                borderWidth={1}
                borderColor="#33CFFF"
                width={118}
                minWidth={118}
                height={201}
                alignItems="center"
                justifyContent="center"
                position="relative"
                paddingTop={4} // Push content down slightly from top bar
            >
                {/* Top Fill Bar */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="11px"
                    bg="#33CFFF"
                    borderTopRadius={18} // Slightly less than card radius to fit snug inside border if needed, or matched. Using 18-20 range.
                    width="100%"
                />

                <Box mb={2} position="relative">
                    <Image
                        source={{ uri: user.avatar }}
                        alt={user.name}
                        size={60}
                        borderRadius="full"
                        borderWidth={2}
                        borderColor="#33CFFF"
                        key={user.avatar}
                    />
                    <RankBadge rank={1} size={8} />
                </Box>
                <Text color="#33CFFF" fontSize="sm" fontWeight="bold" textAlign="center" mb={0.5} numberOfLines={1} px={1}>
                    {user.name}
                </Text>
                {user.title && (
                    <Text color="#33CFFF" fontSize="2xs" fontWeight="medium" opacity={0.8} numberOfLines={1}>
                        {user.title}
                    </Text>
                )}
            </Box>
        );
    };

    const renderSidePlace = (user: TopUser | undefined, rank: 2 | 3) => {
        if (!user) return null;
        return (
            <Box
                bg="#0D0D0D"
                borderRadius={20}
                borderWidth={1}
                borderColor="rgba(0, 195, 255, 0.2)" // #00C3FF at 20% opacity
                width={103}
                minWidth={103}
                height={174}
                alignItems="center"
                justifyContent="center"
            >
                <Box mb={2} position="relative">
                    <Image
                        source={{ uri: user.avatar }}
                        alt={user.name}
                        size={49}
                        borderRadius="full"
                        bg="gray.800"
                    />
                    <RankBadge rank={rank} />
                </Box>
                <Text color="white" fontSize="xs" fontWeight="bold" textAlign="center" mb={0.5} numberOfLines={1} px={1}>
                    {user.name}
                </Text>
                <Text color="gray.400" fontSize="2xs">
                    LVL {user.level}
                </Text>
            </Box>
        );
    };

    return (
        <HStack justifyContent="center" alignItems="flex-end" space={2}>
            {/* 2nd Place */}
            <Box mb={2}>
                {renderSidePlace(second, 2)}
            </Box>

            {/* 1st Place */}
            <Box zIndex={10} mb={6}>
                {renderFirstPlace(first)}
            </Box>

            {/* 3rd Place */}
            <Box mb={2}>
                {renderSidePlace(third, 3)}
            </Box>
        </HStack>
    );
};
