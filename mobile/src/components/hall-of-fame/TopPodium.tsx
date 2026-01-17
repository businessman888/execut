import React from 'react';
import { Box, HStack, VStack, Text, Image } from 'native-base';
import Svg, { Circle, Path } from 'react-native-svg';

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
const RankBadge: React.FC<{ rank: 1 | 2 | 3 }> = ({ rank }) => {
    const colors = {
        1: { bg: '#33CFFF', text: '#0D0D0D' },
        2: { bg: '#6B7280', text: '#F9FAFB' },
        3: { bg: '#92400E', text: '#F9FAFB' },
    };

    return (
        <Box
            position="absolute"
            bottom={-4}
            right={-4}
            bg={colors[rank].bg}
            borderRadius="full"
            w={6}
            h={6}
            alignItems="center"
            justifyContent="center"
            borderWidth={2}
            borderColor="#0D0D0D"
        >
            <Text color={colors[rank].text} fontSize="xs" fontWeight="bold">
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

    const renderUser = (user: TopUser | undefined, isFirst: boolean = false) => {
        if (!user) return null;

        return (
            <Box
                bg={isFirst ? 'surface.primary' : 'surface.secondary'}
                borderRadius="2xl"
                borderWidth={isFirst ? 1 : 0}
                borderColor={isFirst ? 'accent.400' : 'transparent'}
                p={3}
                alignItems="center"
                w={isFirst ? 28 : 20}
            >
                <Box position="relative">
                    <Image
                        source={{ uri: user.avatar }}
                        alt={user.name}
                        size={isFirst ? 16 : 12}
                        borderRadius="full"
                        bg="gray.600"
                    />
                    <RankBadge rank={user.rank} />
                </Box>
                <Text
                    color="text.primary"
                    fontSize={isFirst ? 'sm' : 'xs'}
                    fontWeight="semibold"
                    mt={3}
                    textAlign="center"
                    numberOfLines={1}
                >
                    {user.name}
                </Text>
                {isFirst && user.title && (
                    <Text color="accent.400" fontSize="2xs" fontWeight="medium">
                        {user.title}
                    </Text>
                )}
                <Text color="text.tertiary" fontSize="2xs">
                    LVL {user.level}
                </Text>
            </Box>
        );
    };

    return (
        <HStack justifyContent="center" alignItems="flex-end" space={2}>
            {/* 2nd Place */}
            <Box mb={4}>
                {renderUser(second)}
            </Box>

            {/* 1st Place */}
            <Box>
                {renderUser(first, true)}
            </Box>

            {/* 3rd Place */}
            <Box mb={4}>
                {renderUser(third)}
            </Box>
        </HStack>
    );
};
