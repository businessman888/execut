import React from 'react';
import { Box, HStack, VStack, Text, Image } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';

interface ProfileCardProps {
    avatar?: string;
    name: string;
    role: string;
    level: number;
    isTopPercent?: boolean;
    topPercent?: number;
}

// Verified badge icon
const VerifiedIcon = ({ size = 20 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} fill="#33CFFF" />
        <Path
            d="M8 12L11 15L16 9"
            stroke="#0D0D0D"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const ProfileCard: React.FC<ProfileCardProps> = ({
    avatar,
    name,
    role,
    level,
    isTopPercent = false,
    topPercent = 1,
}) => {
    return (
        <HStack space={4} alignItems="center">
            {/* Avatar with verified badge */}
            <Box position="relative">
                <Image
                    source={{ uri: avatar }}
                    alt={name}
                    size={20}
                    borderRadius="full"
                    borderWidth={2}
                    borderColor="accent.400"
                    bg="gray.600"
                />
                <Box position="absolute" bottom={0} right={0}>
                    <VerifiedIcon size={24} />
                </Box>
            </Box>

            {/* Info */}
            <VStack>
                <Text color="text.primary" fontSize="xl" fontWeight="bold">
                    {name}
                </Text>
                <Text color="text.tertiary" fontSize="sm">
                    {role}
                </Text>
                <HStack space={2} mt={1}>
                    <Box
                        borderWidth={1}
                        borderColor="accent.400"
                        borderRadius="full"
                        px={3}
                        py={0.5}
                    >
                        <Text color="accent.400" fontSize="xs" fontWeight="medium">
                            LVL {level}
                        </Text>
                    </Box>
                    {isTopPercent && (
                        <Box
                            borderWidth={1}
                            borderColor="accent.400"
                            borderRadius="full"
                            px={3}
                            py={0.5}
                        >
                            <Text color="accent.400" fontSize="xs" fontWeight="medium">
                                TOP {topPercent}%
                            </Text>
                        </Box>
                    )}
                </HStack>
            </VStack>
        </HStack>
    );
};
