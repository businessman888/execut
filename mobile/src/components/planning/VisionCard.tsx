import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { EditIcon } from '../icons/NavIcons';

interface VisionCardProps {
    title: string;
    description: string;
    tags: string[];
    onEditPress?: () => void;
}

export const VisionCard: React.FC<VisionCardProps> = ({
    title,
    description,
    tags,
    onEditPress,
}) => {
    return (
        <Box
            bg="surface.secondary"
            borderRadius="2xl"
            p={4}
            borderWidth={1}
            borderColor="border.default"
        >
            <VStack space={3}>
                {/* Header with title and edit button */}
                <HStack justifyContent="space-between" alignItems="center">
                    <Text color="accent.400" fontSize="md" fontWeight="semibold">
                        {title}
                    </Text>
                    <Pressable
                        onPress={onEditPress}
                        p={2}
                        borderRadius="full"
                        _pressed={{ opacity: 0.7 }}
                    >
                        <EditIcon size={18} color="#9CA3AF" />
                    </Pressable>
                </HStack>

                {/* Description */}
                <Text color="text.secondary" fontSize="sm" lineHeight={20}>
                    {description}
                </Text>

                {/* Tags */}
                <HStack space={2} flexWrap="wrap">
                    {tags.map((tag, index) => (
                        <Box
                            key={index}
                            bg="surface.primary"
                            borderRadius="full"
                            px={3}
                            py={1}
                            borderWidth={1}
                            borderColor="border.default"
                        >
                            <Text color="text.secondary" fontSize="xs">
                                #{tag}
                            </Text>
                        </Box>
                    ))}
                </HStack>
            </VStack>
        </Box>
    );
};

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
    },
});
