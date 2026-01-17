import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import Svg, { Path } from 'react-native-svg';

interface Achievement {
    id: string;
    title: string;
    icon: 'rocket' | 'coin' | 'lightning';
    isUnlocked: boolean;
}

interface AchievementsRowProps {
    achievements: Achievement[];
    onViewAll?: () => void;
}

// Rocket icon
const RocketIcon = ({ size = 28, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C12 2 7 7 7 12C7 15 9 18 12 20C15 18 17 15 17 12C17 7 12 2 12 2Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
            fill={color}
        />
    </Svg>
);

// Coin icon
const CoinIcon = ({ size = 28, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={color}
            strokeWidth={1.5}
        />
        <Path
            d="M12 6V18M15 9H10.5C9.67157 9 9 9.67157 9 10.5C9 11.3284 9.67157 12 10.5 12H13.5C14.3284 12 15 12.6716 15 13.5C15 14.3284 14.3284 15 13.5 15H9"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
    </Svg>
);

// Lightning icon
const LightningIcon = ({ size = 28, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M13 2L4 14H11L10 22L19 10H12L13 2Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const IconMap = {
    rocket: RocketIcon,
    coin: CoinIcon,
    lightning: LightningIcon,
};

export const AchievementsRow: React.FC<AchievementsRowProps> = ({
    achievements,
    onViewAll,
}) => {
    return (
        <VStack space={3}>
            <HStack justifyContent="space-between" alignItems="center">
                <Text color="text.primary" fontSize="md" fontWeight="semibold">
                    Conquistas
                </Text>
                <Pressable onPress={onViewAll}>
                    <Text color="text.tertiary" fontSize="sm">
                        Ver tudo
                    </Text>
                </Pressable>
            </HStack>

            <HStack space={3} justifyContent="center">
                {achievements.map((achievement) => {
                    const IconComponent = IconMap[achievement.icon];

                    return (
                        <Box
                            key={achievement.id}
                            flex={1}
                            bg="surface.primary"
                            borderRadius="2xl"
                            borderWidth={1}
                            borderColor="accent.400"
                            p={4}
                            alignItems="center"
                            opacity={achievement.isUnlocked ? 1 : 0.5}
                        >
                            <IconComponent
                                size={28}
                                color={achievement.isUnlocked ? '#33CFFF' : '#6B7280'}
                            />
                            <Text
                                color={achievement.isUnlocked ? 'text.primary' : 'text.tertiary'}
                                fontSize="xs"
                                mt={2}
                            >
                                {achievement.title}
                            </Text>
                        </Box>
                    );
                })}
            </HStack>
        </VStack>
    );
};
