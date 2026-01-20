import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { RocketIcon } from '../icons/NavIcons';

interface WeekObjectiveCardProps {
    title: string;
    description: string;
    progress: number;
}

// WeekObjectiveCard component with updated styles
export const WeekObjectiveCard: React.FC<WeekObjectiveCardProps> = ({
    title,
    description,
    progress,
}) => {
    return (
        <Box
            bg="#111111" // Darker background as per design
            borderRadius="2xl"
            borderWidth={1}
            borderColor="#404040"
            p={4}
            w={350} // Fixed width
            h={157} // Fixed height
            justifyContent="space-between" // Distribute content
        >
            <VStack space={2}>
                <HStack justifyContent="space-between" alignItems="flex-start">
                    <VStack flex={1} mr={3}>
                        <Text color="text.primary" fontSize="xl" fontWeight="bold">
                            {title}
                        </Text>
                        <Text color="text.secondary" fontSize="sm" mt={1}>
                            {description}
                        </Text>
                    </VStack>
                    <Box>
                        <RocketIcon size={24} color="#33CFFF" />
                    </Box>
                </HStack>
            </VStack>

            <VStack space={2}>
                <HStack justifyContent="space-between" alignItems="center">
                    <Text color="text.secondary" fontSize="xs">
                        Progress status
                    </Text>
                    <Text color="#33CFFF" fontSize="xs" fontWeight="bold">
                        {progress}%
                    </Text>
                </HStack>

                <Box w="100%" h={7} bg="surface.tertiary" borderRadius="full" overflow="hidden">
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
        </Box>
    );
};
