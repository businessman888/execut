import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import Svg, { Path } from 'react-native-svg';

interface WeekObjectiveCardProps {
    title: string;
    description: string;
    progress: number;
}

// Rocket icon
const RocketIcon = ({ color = '#33CFFF', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12.707 2.29289C13.0975 2.68342 13.0975 3.31658 12.707 3.70711L11.414 5H13C16.866 5 20 8.13401 20 12V13C20 13.5523 19.5523 14 19 14C18.4477 14 18 13.5523 18 13V12C18 9.23858 15.7614 7 13 7H11.414L12.707 8.29289C13.0975 8.68342 13.0975 9.31658 12.707 9.70711C12.3165 10.0976 11.6833 10.0976 11.2928 9.70711L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289L11.2928 2.29289C11.6833 1.90237 12.3165 1.90237 12.707 2.29289Z"
            fill={color}
        />
        <Path
            d="M5 11C5.55228 11 6 11.4477 6 12C6 14.7614 8.23858 17 11 17H12.586L11.293 15.7071C10.9025 15.3166 10.9025 14.6834 11.293 14.2929C11.6835 13.9024 12.3167 13.9024 12.7072 14.2929L15.7072 17.2929C16.0977 17.6834 16.0977 18.3166 15.7072 18.7071L12.7072 21.7071C12.3167 22.0976 11.6835 22.0976 11.293 21.7071C10.9025 21.3166 10.9025 20.6834 11.293 20.2929L12.586 19H11C7.13401 19 4 15.866 4 12C4 11.4477 4.44772 11 5 11Z"
            fill={color}
        />
    </Svg>
);

export const WeekObjectiveCard: React.FC<WeekObjectiveCardProps> = ({
    title,
    description,
    progress,
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
                {/* Title and Icon */}
                <HStack justifyContent="space-between" alignItems="flex-start">
                    <VStack flex={1} mr={3}>
                        <Text color="text.primary" fontSize="lg" fontWeight="bold">
                            {title}
                        </Text>
                        <Text color="text.secondary" fontSize="sm" mt={1}>
                            {description}
                        </Text>
                    </VStack>
                    <Box
                        bg="accent.400"
                        borderRadius="xl"
                        p={2}
                    >
                        <RocketIcon size={24} color="#0D0D0D" />
                    </Box>
                </HStack>

                {/* Progress Section */}
                <VStack space={2}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text color="text.secondary" fontSize="xs">
                            Progress status
                        </Text>
                        <Text color="accent.400" fontSize="xs" fontWeight="bold">
                            {progress}%
                        </Text>
                    </HStack>

                    {/* Progress Bar */}
                    <Box
                        w="100%"
                        h={2}
                        bg="rgba(255,255,255,0.1)"
                        borderRadius="full"
                        overflow="hidden"
                    >
                        <Box
                            w={`${progress}%`}
                            h="100%"
                            bg="accent.400"
                            borderRadius="full"
                        />
                    </Box>
                </VStack>
            </VStack>
        </Box>
    );
};
