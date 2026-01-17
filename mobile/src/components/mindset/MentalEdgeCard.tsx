import React from 'react';
import { Box, HStack, VStack, Text, Pressable, Image } from 'native-base';
import Svg, { Path, Rect } from 'react-native-svg';

type MentalCardStatus = 'active' | 'available' | 'locked';

interface MentalEdgeCardProps {
    title: string;
    subtitle?: string;
    image?: string;
    icon?: React.ReactNode;
    status: MentalCardStatus;
    unlockPoints?: number;
    onPress?: () => void;
}

// Arrow right icon
const ArrowRightIcon = ({ size = 24, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 18L15 12L9 6"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Lock icon
const LockIcon = ({ size = 20, color = '#6B7280' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x={5} y={11} width={14} height={10} rx={2} fill={color} />
        <Path
            d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
        />
    </Svg>
);

// Brain icon for Mental Edge
const BrainIcon = ({ size = 28, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 4C8 4 5 7 5 11C5 13 6 14.5 7 15.5C7 16.5 7 18 7 19C7 20 8 21 9 21H15C16 21 17 20 17 19C17 18 17 16.5 17 15.5C18 14.5 19 13 19 11C19 7 16 4 12 4Z"
            stroke={color}
            strokeWidth={1.5}
            fill={color}
            fillOpacity={0.2}
        />
    </Svg>
);

// Puzzle icon for Frameworks
const PuzzleIcon = ({ size = 28, color = '#9CA3AF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M11 4V3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V4H15C15.5523 4 16 4.44772 16 5V7C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9V11C16 11.5523 15.5523 12 15 12H13V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V12H9C8.44772 12 8 11.5523 8 11V9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7V5C8 4.44772 8.44772 4 9 4H11Z"
            fill={color}
        />
    </Svg>
);

export const MentalEdgeCard: React.FC<MentalEdgeCardProps> = ({
    title,
    subtitle,
    image,
    icon,
    status,
    unlockPoints,
    onPress,
}) => {
    const isActive = status === 'active';
    const isLocked = status === 'locked';

    return (
        <Pressable onPress={onPress} disabled={isLocked}>
            <Box
                bg="surface.primary"
                borderRadius="2xl"
                borderWidth={isActive ? 1 : 0}
                borderColor={isActive ? 'accent.400' : 'transparent'}
                overflow="hidden"
                opacity={isLocked ? 0.7 : 1}
            >
                <HStack alignItems="center">
                    {/* Image or Icon Section */}
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            alt={title}
                            w={20}
                            h={20}
                            resizeMode="cover"
                        />
                    ) : (
                        <Box
                            w={20}
                            h={20}
                            bg="surface.secondary"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {icon}
                        </Box>
                    )}

                    {/* Content */}
                    <VStack flex={1} px={4} py={4}>
                        <Text
                            color="text.primary"
                            fontSize="md"
                            fontWeight="semibold"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        {subtitle && (
                            <Text
                                color="text.tertiary"
                                fontSize="xs"
                                numberOfLines={1}
                            >
                                {subtitle}
                            </Text>
                        )}
                        {isLocked && unlockPoints && (
                            <Text color="text.tertiary" fontSize="xs">
                                Alcance +{unlockPoints.toLocaleString()} PTS
                            </Text>
                        )}
                    </VStack>

                    {/* Action Icon */}
                    <Box pr={4}>
                        {isLocked ? (
                            <LockIcon size={20} color="#6B7280" />
                        ) : (
                            <ArrowRightIcon size={24} color="#33CFFF" />
                        )}
                    </Box>
                </HStack>
            </Box>
        </Pressable>
    );
};

// Export icons for use in screen
export { BrainIcon, PuzzleIcon };
