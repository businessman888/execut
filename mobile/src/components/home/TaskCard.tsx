import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
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
                py={3}
            >
                <HStack alignItems="center" justifyContent="space-between">
                    {/* Left: Icon and Text */}
                    <HStack space={3} alignItems="center" flex={1}>
                        {/* Icon Container */}
                        <Box
                            w={12}
                            h={12}
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
                                fontSize="md"
                                fontWeight="semibold"
                            >
                                {title}
                            </Text>
                            <Text color="text.secondary" fontSize="xs">
                                {category}
                            </Text>
                        </VStack>
                    </HStack>

                    {/* Right: Status Indicator */}
                    <Box>
                        {isCompleted ? (
                            <Box
                                w={8}
                                h={8}
                                borderRadius="full"
                                bg="accent.400"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <CheckmarkIcon size={18} color="#FFFFFF" />
                            </Box>
                        ) : (
                            <ChevronRightIcon size={24} color="#9CA3AF" />
                        )}
                    </Box>
                </HStack>
            </Box>
        </Pressable>
    );
};
