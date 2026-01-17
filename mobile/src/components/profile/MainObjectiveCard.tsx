import React from 'react';
import { Box, VStack, HStack, Text } from 'native-base';

interface MainObjectiveCardProps {
    quarter: string;
    title: string;
    progress: number;
}

export const MainObjectiveCard: React.FC<MainObjectiveCardProps> = ({
    quarter,
    title,
    progress,
}) => {
    return (
        <VStack space={3}>
            <Text color="text.primary" fontSize="md" fontWeight="semibold">
                Objetivo principal
            </Text>

            <Box
                bg="surface.primary"
                borderRadius="2xl"
                borderWidth={1}
                borderColor="border.default"
                p={4}
            >
                <VStack space={3}>
                    {/* Quarter label */}
                    <Text color="accent.400" fontSize="sm" fontWeight="semibold">
                        {quarter}
                    </Text>

                    {/* Title */}
                    <Text color="text.primary" fontSize="lg" fontWeight="bold">
                        {title}
                    </Text>

                    {/* Progress */}
                    <VStack space={1}>
                        <HStack justifyContent="space-between">
                            <Text color="text.tertiary" fontSize="xs">
                                Progresso
                            </Text>
                            <Text color="text.tertiary" fontSize="xs">
                                {progress}%
                            </Text>
                        </HStack>
                        <Box
                            bg="surface.secondary"
                            borderRadius="full"
                            h={2}
                            overflow="hidden"
                        >
                            <Box
                                bg="accent.400"
                                h="100%"
                                w={`${Math.min(progress, 100)}%`}
                                borderRadius="full"
                            />
                        </Box>
                    </VStack>
                </VStack>
            </Box>
        </VStack>
    );
};
