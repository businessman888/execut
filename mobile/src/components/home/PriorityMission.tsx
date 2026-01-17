import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { TimerIcon, ThreeDotsIcon } from '../icons/TaskIcons';

interface PriorityMissionProps {
    badge: string;
    title: string;
    subtitle: string;
    progress: number;
    timeRemaining: string;
    onPress?: () => void;
    onMenuPress?: () => void;
}

export const PriorityMission: React.FC<PriorityMissionProps> = ({
    badge,
    title,
    subtitle,
    progress,
    timeRemaining,
    onPress,
    onMenuPress,
}) => {
    return (
        <Pressable onPress={onPress}>
            <Box
                bg="surface.primary"
                borderRadius="2xl"
                borderWidth={1}
                borderColor="border.subtle"
                p={4}
                overflow="hidden"
            >
                {/* Top row: Badge and Menu */}
                <HStack justifyContent="space-between" alignItems="center" mb={3}>
                    {/* Badge */}
                    <Box
                        bg="rgba(51, 207, 255, 0.15)"
                        borderRadius="full"
                        px={3}
                        py={1}
                    >
                        <HStack space={1} alignItems="center">
                            <Text color="accent.400" fontSize="2xs">⚡</Text>
                            <Text color="accent.400" fontSize="xs" fontWeight="medium">
                                {badge}
                            </Text>
                        </HStack>
                    </Box>

                    {/* Menu button */}
                    <Pressable onPress={onMenuPress} p={1}>
                        <ThreeDotsIcon size={20} color="#9CA3AF" />
                    </Pressable>
                </HStack>

                {/* Title and Subtitle */}
                <VStack mb={4}>
                    <Text color="text.primary" fontSize="lg" fontWeight="bold">
                        {title}
                    </Text>
                    <Text color="text.secondary" fontSize="sm">
                        {subtitle}
                    </Text>
                </VStack>

                {/* Progress Section */}
                <VStack space={2} mb={4}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text color="text.secondary" fontSize="xs">
                            Progresso
                        </Text>
                        <Text color="text.secondary" fontSize="xs">
                            {progress}%
                        </Text>
                    </HStack>

                    {/* Progress Bar */}
                    <Box w="100%" h={1.5} bg="surface.tertiary" borderRadius="full" overflow="hidden">
                        <View style={[styles.progressBar, { width: `${progress}%` }]}>
                            <LinearGradient
                                colors={['#33CFFF', '#00A3CC']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            />
                        </View>
                    </Box>
                </VStack>

                {/* Timer */}
                <HStack alignItems="center" space={2}>
                    <Box
                        bg="surface.secondary"
                        borderRadius="xl"
                        px={4}
                        py={2}
                    >
                        <HStack space={2} alignItems="center">
                            <TimerIcon size={18} color="#33CFFF" />
                            <Text color="text.primary" fontSize="lg" fontWeight="bold">
                                {timeRemaining}
                            </Text>
                        </HStack>
                    </Box>
                    <Text color="text.secondary" fontSize="sm">
                        Restantes!
                    </Text>
                </HStack>
            </Box>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        height: '100%',
        borderRadius: 999,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
    },
});
