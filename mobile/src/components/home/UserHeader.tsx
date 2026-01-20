import React from 'react';
import { Box, HStack, VStack, Text, Image, Pressable } from 'native-base';
import { FireIcon } from '../icons/TaskIcons';

interface UserHeaderProps {
    userName: string;
    userStatus: string;
    level: number;
    streak: number;
    avatarUrl?: string;
    onAvatarPress?: () => void;
}

export const UserHeader: React.FC<UserHeaderProps> = ({
    userName,
    userStatus,
    level,
    streak,
    avatarUrl,
    onAvatarPress,
}) => {
    return (
        <HStack alignItems="center" justifyContent="space-between" w="100%">
            {/* Left: Avatar and User Info */}
            <HStack space={3} alignItems="center">
                {/* Avatar */}
                <Pressable onPress={onAvatarPress} _pressed={{ opacity: 0.7 }}>
                    <Box
                        w={50}
                        h={50}
                        borderRadius="full"
                        borderWidth={2}
                        borderColor="border.default"
                        overflow="hidden"
                    >
                        {avatarUrl ? (
                            <Image
                                source={{ uri: avatarUrl }}
                                alt={userName}
                                w="100%"
                                h="100%"
                                resizeMode="cover"
                            />
                        ) : (
                            <Box
                                w="100%"
                                h="100%"
                                bg="surface.secondary"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text color="text.primary" fontSize="lg" fontWeight="bold">
                                    {userName.charAt(0).toUpperCase()}
                                </Text>
                            </Box>
                        )}
                    </Box>
                </Pressable>

                {/* User Info */}
                <VStack>
                    <Text color="text.primary" fontSize="xl" fontWeight="bold">
                        {userName}
                    </Text>
                    <Text color="text.secondary" fontSize="sm">
                        {userStatus}
                    </Text>
                </VStack>
            </HStack>

            {/* Right: Level and Streak */}
            <HStack space={2} alignItems="center">
                {/* Level Badge */}
                <Box
                    bg="surface.secondary"
                    borderWidth={1}
                    borderColor="border.default"
                    px={4}
                    py={2}
                    borderRadius="full"
                >
                    <Text color="text.primary" fontSize="sm" fontWeight="bold">
                        LVL {level}
                    </Text>
                </Box>

                {/* Streak */}
                <HStack
                    bg="surface.secondary"
                    borderWidth={1}
                    borderColor="border.default"
                    px={4}
                    py={2}
                    borderRadius="full"
                    space={2}
                    alignItems="center"
                >
                    <FireIcon size={16} color="#FF6B35" />
                    <Text color="text.primary" fontSize="sm" fontWeight="bold">
                        {streak}
                    </Text>
                </HStack>
            </HStack>
        </HStack>
    );
};
