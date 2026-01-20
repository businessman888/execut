import React from 'react';
import { Box, HStack, VStack, Text } from '../ui';
import { Image as RNImage, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface ProfileCardProps {
    avatar?: string;
    name: string;
    role: string;
    level: number;
    isTopPercent?: boolean;
    topPercent?: number;
}

// Verified badge icon (checkmark in circle)
const VerifiedBadge = ({ size = 24 }: { size?: number }) => (
    <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#33CFFF',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
            <Path
                d="M5 12L10 17L19 8"
                stroke="#0D0D0D"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    </View>
);

export const ProfileCard: React.FC<ProfileCardProps> = ({
    avatar,
    name,
    role,
    level,
    isTopPercent = false,
    topPercent = 1,
}) => {
    const avatarSize = 70;

    return (
        <HStack space={4} alignItems="center">
            {/* Avatar with verified badge */}
            <Box position="relative">
                <Box
                    w={avatarSize}
                    h={avatarSize}
                    borderRadius={avatarSize / 2}
                    borderWidth={2}
                    borderColor="#33CFFF"
                    overflow="hidden"
                    bg="#1A1A1A"
                >
                    {avatar && (
                        <RNImage
                            source={{ uri: avatar }}
                            style={{
                                width: avatarSize - 4,
                                height: avatarSize - 4,
                                borderRadius: (avatarSize - 4) / 2,
                            }}
                            resizeMode="cover"
                        />
                    )}
                </Box>
                {/* Verified badge positioned at bottom-right */}
                <Box position="absolute" bottom={-2} right={-2}>
                    <VerifiedBadge size={24} />
                </Box>
            </Box>

            {/* Info */}
            <VStack>
                <Text color="#FFFFFF" fontSize={20} fontWeight="bold">
                    {name}
                </Text>
                <Text color="#9CA3AF" fontSize={14} mb={2}>
                    {role}
                </Text>
                <HStack space={2}>
                    <Box
                        bg="#33CFFF"
                        borderRadius={20}
                        px={3}
                        py={1}
                    >
                        <Text color="#0D0D0D" fontSize={12} fontWeight="bold">
                            LVL {level}
                        </Text>
                    </Box>
                    {isTopPercent && (
                        <Box
                            bg="#33CFFF"
                            borderRadius={20}
                            px={3}
                            py={1}
                        >
                            <Text color="#0D0D0D" fontSize={12} fontWeight="bold">
                                TOP {topPercent}%
                            </Text>
                        </Box>
                    )}
                </HStack>
            </VStack>
        </HStack>
    );
};
