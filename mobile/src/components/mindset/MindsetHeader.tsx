import React from 'react';
import { Box, HStack, VStack, Text, Image, Pressable } from 'native-base';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface MindsetHeaderProps {
    avatar?: string;
    status: string;
    level: number;
    title: string;
    currentXP: number;
    maxXP: number;
    onAvatarPress?: () => void;
}

// Brain icon
const BrainIcon = ({ color = '#33CFFF', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 4C8 4 5 7 5 11C5 13 6 14.5 7 15.5C7 16.5 7 18 7 19C7 20 8 21 9 21H15C16 21 17 20 17 19C17 18 17 16.5 17 15.5C18 14.5 19 13 19 11C19 7 16 4 12 4Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M9 21V18M15 21V18M12 4V8M8 11H10M14 11H16M9 14H15"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const MindsetHeader: React.FC<MindsetHeaderProps> = ({
    avatar,
    status,
    level,
    title,
    currentXP,
    maxXP,
    onAvatarPress,
}) => {
    const progress = (currentXP / maxXP) * 100;

    return (
        <VStack space={3}>
            <HStack alignItems="center" space={3}>
                {/* Avatar */}
                <Pressable onPress={onAvatarPress} _pressed={{ opacity: 0.7 }}>
                    <Box
                        borderRadius="full"
                        borderWidth={2}
                        borderColor="accent.400"
                        p={0.5}
                    >
                        {avatar ? (
                            <Image
                                source={{ uri: avatar }}
                                alt="Avatar"
                                w={46}
                                h={46}
                                borderRadius="full"
                            />
                        ) : (
                            <Box
                                w={46}
                                h={46}
                                borderRadius="full"
                                bg="surface.secondary"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <BrainIcon size={24} color="#33CFFF" />
                            </Box>
                        )}
                    </Box>
                </Pressable>

                {/* Status Info */}
                <VStack flex={1}>
                    <Text color="text.tertiary" fontSize={14}>
                        {status}
                    </Text>
                    <Text color="text.primary" fontSize={14} fontWeight="semibold">
                        Level {String(level).padStart(2, '0')} / {title}
                    </Text>
                </VStack>
            </HStack>

            {/* XP Progress */}
            <VStack space={1}>
                <HStack justifyContent="space-between">
                    <Text color="accent.400" fontSize="xs">
                        XP progress
                    </Text>
                    <Text color="text.tertiary" fontSize="xs">
                        {currentXP.toLocaleString()} / {maxXP.toLocaleString()}
                    </Text>
                </HStack>
                <Box
                    w="100%"
                    h={7}
                    bg="surface.tertiary"
                    borderRadius="full"
                    overflow="hidden"
                >
                    <Box w={`${Math.min(progress, 100)}%`} h="100%" overflow="hidden">
                        <LinearGradient
                            colors={['#33CFFF', '#475FAF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1 }}
                        />
                    </Box>
                </Box>
            </VStack>
        </VStack>
    );
};
