import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';

interface AIInsightsCardProps {
    message: string;
    onViewMore?: () => void;
}

// Lightbulb icon
const IdeaIcon = ({ color = '#33CFFF', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.2208 7.20683 13.1599 9 14.1973V17C9 17.5523 9.44772 18 10 18H14C14.5523 18 15 17.5523 15 17V14.1973C16.7932 13.1599 18 11.2208 18 9C18 5.68629 15.3137 3 12 3Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Arrow right icon
const ArrowRightIcon = ({ size = 20, color = '#33CFFF' }: { size?: number; color?: string }) => (
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

export const AIInsightsCard: React.FC<AIInsightsCardProps> = ({
    message,
    onViewMore,
}) => {
    return (
        <Box
            bg="surface.primary"
            borderRadius="2xl"
            borderWidth={1}
            borderColor="border.default"
            p={4}
        >
            <VStack space={3}>
                {/* Header */}
                <HStack space={2} alignItems="center">
                    <Box
                        bg="surface.secondary"
                        borderRadius="full"
                        p={2}
                    >
                        <IdeaIcon size={20} color="#33CFFF" />
                    </Box>
                    <Text color="accent.400" fontSize="sm" fontWeight="semibold">
                        AI INSIGHTS
                    </Text>
                </HStack>

                {/* Message */}
                <Text color="text.secondary" fontSize="sm" lineHeight="lg">
                    {message}
                </Text>

                {/* View More */}
                <Pressable onPress={onViewMore}>
                    <HStack alignItems="center" space={1}>
                        <Text color="accent.400" fontSize="sm">
                            Ver análise completa
                        </Text>
                        <ArrowRightIcon size={16} color="#33CFFF" />
                    </HStack>
                </Pressable>
            </VStack>
        </Box>
    );
};
