import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from '../ui';
import { ChevronRightIcon, CheckmarkIcon } from '../icons/TaskIcons';

interface TaskCardProps {
    icon: React.ReactNode;
    title: string;
    category: string;
    isCompleted?: boolean;
    onPress?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
    icon,
    title,
    category,
    isCompleted = false,
    onPress,
}) => {
    return (
        <Pressable onPress={onPress}>
            <Box
                bg="surface.primary"
                borderRadius="2xl"
                borderWidth={1}
                borderColor="border.subtle"
                px={4}
                py={4}
            >
                <HStack alignItems="center" justifyContent="space-between">
                    {/* Left: Icon and Text */}
                    <HStack space={3} alignItems="center" flex={1}>
                        {/* Icon Container */}
                        <Box
                            w={46}
                            h={46}
                            borderRadius="xl"
                            bg="surface.secondary"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {icon}
                        </Box>

                        {/* Text */}
                        <VStack flex={1}>
                            <Text
                                color="text.primary"
                                fontSize="lg"
                                fontWeight="semibold"
                            >
                                {title}
                            </Text>
                            <Text color="text.secondary" fontSize="sm">
                                {category}
                            </Text>
                        </VStack>
                    </HStack>

                    {/* Right: Status Indicator */}
                    <Box>
                        {isCompleted ? (
                            <CheckmarkIcon size={28} />
                        ) : (
                            <ChevronRightIcon size={24} color="#9CA3AF" />
                        )}
                    </Box>
                </HStack>
            </Box>
        </Pressable>
    );
};
