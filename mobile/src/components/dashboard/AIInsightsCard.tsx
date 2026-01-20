import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface AIInsightsCardProps {
    message: string;
    onViewMore?: () => void;
}

// Lightbulb icon with Gradient
const IdeaIcon = ({ width = 18, height = 25 }: { width?: number; height?: number }) => (
    <Svg width={width} height={height} viewBox="0 0 18 25" fill="none">
        <Path
            d="M8.75 0C6.42936 0 4.20376 0.921872 2.56282 2.56282C0.921872 4.20376 0 6.42936 0 8.75C0 11.725 1.4875 14.3375 3.75 15.925V18.75C3.75 19.0815 3.8817 19.3995 4.11612 19.6339C4.35054 19.8683 4.66848 20 5 20H12.5C12.8315 20 13.1495 19.8683 13.3839 19.6339C13.6183 19.3995 13.75 19.0815 13.75 18.75V15.925C16.0125 14.3375 17.5 11.725 17.5 8.75C17.5 6.42936 16.5781 4.20376 14.9372 2.56282C13.2962 0.921872 11.0706 0 8.75 0ZM5 23.75C5 24.0815 5.1317 24.3995 5.36612 24.6339C5.60054 24.8683 5.91848 25 6.25 25H11.25C11.5815 25 11.8995 24.8683 12.1339 24.6339C12.3683 24.3995 12.5 24.0815 12.5 23.75V22.5H5V23.75Z"
            fill="url(#paint0_linear_67_227)"
        />
        <Defs>
            <LinearGradient
                id="paint0_linear_67_227"
                x1="0"
                y1="14.4613"
                x2="17.5"
                y2="14.4595"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#33CFFF" />
                <Stop offset="1" stopColor="#475FAF" />
            </LinearGradient>
        </Defs>
    </Svg>
);

// Arrow right icon
const ArrowRightIcon = ({ size = 20, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
            borderColor="#33CFFF"
            p={5}
        >
            <VStack space={4}>
                {/* Header */}
                <HStack space={3} alignItems="center">
                    <IdeaIcon width={24} height={33} />
                    <Text color="#33CFFF" fontSize="md" fontWeight="bold">
                        AI INSIGHTS
                    </Text>
                </HStack>

                {/* Message */}
                <Text color="text.secondary" fontSize="md" lineHeight={24}>
                    {message}
                </Text>

                {/* View More */}
                <Pressable onPress={onViewMore} alignSelf="flex-end">
                    <HStack alignItems="center" space={1}>
                        <Text color="#33CFFF" fontSize="sm" fontWeight="medium">
                            Ver análise completa
                        </Text>
                        <ArrowRightIcon size={16} color="#33CFFF" />
                    </HStack>
                </Pressable>
            </VStack>
        </Box>
    );
};
