import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface MonthHeaderProps {
    badge: string;
    focusLabel: string;
    title: string;
    subtitle: string;
    progress: number;
    onMenuPress?: () => void;
}

// Three dots menu icon
const DotsIcon = ({ color = '#6B7280', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            fill={color}
            stroke={color}
            strokeWidth={2}
        />
        <Path
            d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
            fill={color}
            stroke={color}
            strokeWidth={2}
        />
        <Path
            d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
            fill={color}
            stroke={color}
            strokeWidth={2}
        />
    </Svg>
);

export const MonthHeader: React.FC<MonthHeaderProps> = ({
    badge,
    focusLabel,
    title,
    subtitle,
    progress,
    onMenuPress,
}) => {
    return (
        <VStack space={4}>
            {/* Badge and Focus Label */}
            <HStack space={2} alignItems="center">
                <Box
                    bg="accent.400"
                    borderRadius="full"
                    px={3}
                    py={1}
                >
                    <Text color="background.primary" fontSize="xs" fontWeight="semibold">
                        {badge}
                    </Text>
                </Box>
                <Text color="text.secondary" fontSize="sm">
                    {focusLabel}
                </Text>
            </HStack>

            {/* Title */}
            <VStack>
                <Text color="text.primary" fontSize={28} fontWeight="bold">
                    {title}
                </Text>
                <Text color="accent.400" fontSize={28} fontWeight="bold">
                    {subtitle}
                </Text>
            </VStack>

            {/* Progress Section */}
            <VStack space={2}>
                <HStack justifyContent="space-between" alignItems="center">
                    <Text color="text.secondary" fontSize="sm">
                        Progresso geral
                    </Text>
                    <Text color="text.secondary" fontSize="sm" fontWeight="semibold">
                        {progress}%
                    </Text>
                </HStack>

                {/* Progress Bar */}
                <Box
                    w="100%"
                    h={7}
                    bg="surface.tertiary"
                    borderRadius="full"
                    overflow="hidden"
                >
                    <Box w={`${progress}%`} h="100%" overflow="hidden">
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
