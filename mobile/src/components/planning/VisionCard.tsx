import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
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
            borderRadius="2xl"
            overflow="hidden"
            borderWidth={1}
            borderColor="accent.400"
        >
            <LinearGradient
                colors={['rgba(51, 207, 255, 0.1)', 'rgba(51, 207, 255, 0.02)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <VStack p={4} space={3}>
                    {/* Header with title and edit button */}
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text color="text.primary" fontSize="md" fontWeight="semibold">
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
                    <Text color="text.secondary" fontSize="sm" lineHeight="xl">
                        {description}
                    </Text>

                    {/* Tags */}
                    <HStack space={2} flexWrap="wrap">
                        {tags.map((tag, index) => (
                            <Box
                                key={index}
                                bg="surface.secondary"
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
            </LinearGradient>
        </Box>
    );
};

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
    },
});
