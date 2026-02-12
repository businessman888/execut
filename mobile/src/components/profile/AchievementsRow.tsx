import React from 'react';
import { Box, HStack, VStack, Text, Pressable, ScrollView } from '../ui';
import Svg, { Path } from 'react-native-svg';
import { AchievementIcon } from '../gamification/AchievementToast';

interface Achievement {
    id: string;
    title: string;
    iconSlug: string;
    isUnlocked: boolean;
}

interface AchievementsRowProps {
    achievements: Achievement[];
    onViewAll?: () => void;
}

export const AchievementsRow: React.FC<AchievementsRowProps> = ({
    achievements,
    onViewAll,
}) => {
    // Show first row of 5 icons, scroll for more
    return (
        <VStack space={3}>
            <HStack justifyContent="space-between" alignItems="center">
                <Text color="#FFFFFF" fontSize={16} fontWeight="semibold">
                    Conquistas
                </Text>
                <Pressable onPress={onViewAll}>
                    <Text color="#33CFFF" fontSize={14}>
                        Ver tudo
                    </Text>
                </Pressable>
            </HStack>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
            >
                {achievements.map((achievement) => (
                    <Box
                        key={achievement.id}
                        w={90}
                        bg="surface.primary"
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={
                            achievement.isUnlocked
                                ? 'rgba(51, 207, 255, 0.3)'
                                : 'rgba(107, 114, 128, 0.2)'
                        }
                        p={3}
                        alignItems="center"
                        opacity={achievement.isUnlocked ? 1 : 0.45}
                    >
                        <Box
                            w={44}
                            h={44}
                            borderRadius={22}
                            bg={
                                achievement.isUnlocked
                                    ? 'rgba(51, 207, 255, 0.15)'
                                    : 'rgba(107, 114, 128, 0.1)'
                            }
                            alignItems="center"
                            justifyContent="center"
                        >
                            <AchievementIcon
                                slug={achievement.iconSlug}
                                size={24}
                            />
                        </Box>
                        <Text
                            color={achievement.isUnlocked ? '#FFFFFF' : '#6B7280'}
                            fontSize={10}
                            mt={2}
                            textAlign="center"
                            numberOfLines={2}
                        >
                            {achievement.title}
                        </Text>
                    </Box>
                ))}
            </ScrollView>
        </VStack>
    );
};
