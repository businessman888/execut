
import React from 'react';
import { Box, HStack, VStack, Text } from '../ui';
import { Image as RNImage } from 'react-native';

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
const RankBadge: React.FC<{ rank: 1 | 2 | 3; size?: number }> = ({ rank, size = 24 }) => {
    return (
        <Box
            position="absolute"
            bottom={-4}
            right={-4}
            bg="#33CFFF"
            w={size}
            h={size}
            borderRadius={size / 2}
            alignItems="center"
            justifyContent="center"
            borderWidth={2}
            borderColor="#0D0D0D"
            zIndex={10}
        >
            <Text color="#0D0D0D" fontSize={12} fontWeight="bold">
                {rank}
            </Text>
        </Box>
    );
};

// Circular Avatar with rank badge
const CircularAvatar: React.FC<{
    uri: string;
    size: number;
    rank: 1 | 2 | 3;
    hasBorder?: boolean;
    borderColor?: string;
}> = ({ uri, size, rank, hasBorder = false, borderColor = '#33CFFF' }) => {
    const borderWidth = hasBorder ? 3 : 0;
    const innerSize = size - (borderWidth * 2);

    return (
        <Box position="relative">
            <Box
                w={size}
                h={size}
                borderRadius={size / 2}
                borderWidth={borderWidth}
                borderColor={borderColor}
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
                bg="#1A1A1A"
            >
                <RNImage
                    source={{ uri }}
                    style={{
                        width: innerSize,
                        height: innerSize,
                        borderRadius: innerSize / 2,
                    }}
                    resizeMode="cover"
                />
            </Box>
            <RankBadge rank={rank} size={28} />
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
                pt={6}
            >
                {/* Top Fill Bar */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h={11}
                    bg="#33CFFF"
                    borderTopLeftRadius={18}
                    borderTopRightRadius={18}
                />

                {/* Avatar with badge */}
                <Box mb={3}>
                    <CircularAvatar
                        uri={user.avatar}
                        size={80}
                        rank={1}
                        hasBorder={true}
                        borderColor="#33CFFF"
                    />
                </Box>

                <Text color="#FFFFFF" fontSize={14} fontWeight="bold" textAlign="center" numberOfLines={1}>
                    {user.name}
                </Text>
                {user.title && (
                    <Text color="#33CFFF" fontSize={12} fontWeight="medium" numberOfLines={1}>
                        {user.title}
                    </Text>
                )}
            </Box>
        );
    };

    const renderSidePlace = (user: TopUser | undefined, rank: 2 | 3) => {
        if (!user) return null;
        return (
            <VStack alignItems="center" space={2}>
                {/* Avatar with badge - outside the card */}
                <CircularAvatar
                    uri={user.avatar}
                    size={70}
                    rank={rank}
                />

                {/* Name and Level */}
                <Text color="#FFFFFF" fontSize={14} fontWeight="bold" textAlign="center" numberOfLines={1}>
                    {user.name}
                </Text>
                <Text color="#6B7280" fontSize={12}>
                    LVL {user.level}
                </Text>
            </VStack>
        );
    };

    return (
        <HStack justifyContent="space-between" alignItems="flex-end" px={4}>
            {/* 2nd Place */}
            <Box alignItems="center" mb={4}>
                {renderSidePlace(second, 2)}
            </Box>

            {/* 1st Place */}
            <Box zIndex={10}>
                {renderFirstPlace(first)}
            </Box>

            {/* 3rd Place */}
            <Box alignItems="center" mb={4}>
                {renderSidePlace(third, 3)}
            </Box>
        </HStack>
    );
};
