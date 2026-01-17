import React from 'react';
import { Box, HStack, Text, Pressable } from 'native-base';
import { ChevronBackIcon, BellIcon } from '../icons/NavIcons';

interface PlanningHeaderProps {
    title: string;
    onBackPress?: () => void;
    onNotificationPress?: () => void;
}

export const PlanningHeader: React.FC<PlanningHeaderProps> = ({
    title,
    onBackPress,
    onNotificationPress,
}) => {
    return (
        <HStack
            alignItems="center"
            justifyContent="space-between"
            px={4}
            py={3}
            w="100%"
        >
            {/* Back Button */}
            <Pressable
                onPress={onBackPress}
                p={2}
                borderRadius="full"
                _pressed={{ opacity: 0.7 }}
            >
                <ChevronBackIcon size={24} color="#F9FAFB" />
            </Pressable>

            {/* Title */}
            <Text
                color="text.secondary"
                fontSize="lg"
                fontWeight="normal"
            >
                {title}
            </Text>

            {/* Notification Bell */}
            <Pressable
                onPress={onNotificationPress}
                p={2}
                borderRadius="full"
                _pressed={{ opacity: 0.7 }}
            >
                <BellIcon size={24} color="#33CFFF" />
            </Pressable>
        </HStack>
    );
};
