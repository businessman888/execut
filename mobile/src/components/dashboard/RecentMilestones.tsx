import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';

interface Milestone {
    id: string;
    title: string;
    completedAt: string;
    xpReward: number;
}

interface RecentMilestonesProps {
    milestones: Milestone[];
    onMilestonePress?: (id: string) => void;
}

// Checkmark icon
const CheckmarkIcon = ({ size = 20 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} fill="#33CFFF" />
        <Path
            d="M8 12L11 15L16 9"
            stroke="#0D0D0D"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const RecentMilestones: React.FC<RecentMilestonesProps> = ({
    milestones,
    onMilestonePress,
}) => {
    return (
        <VStack space={4}>
            <Text color="text.primary" fontSize="md" fontWeight="semibold">
                Marcos Recentes
            </Text>

            <VStack space={3}>
                {milestones.map((milestone) => (
                    <Pressable
                        key={milestone.id}
                        onPress={() => onMilestonePress?.(milestone.id)}
                    >
                        <Box
                            bg="surface.primary"
                            borderRadius="2xl"
                            borderWidth={1}
                            borderColor="border.default"
                            p={4}
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <HStack space={3} alignItems="center" flex={1}>
                                    <CheckmarkIcon size={24} />
                                    <VStack flex={1}>
                                        <Text color="text.primary" fontSize="sm" fontWeight="medium">
                                            {milestone.title}
                                        </Text>
                                        <Text color="text.tertiary" fontSize="xs">
                                            {milestone.completedAt}
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Text color="accent.400" fontSize="md" fontWeight="bold">
                                    +{milestone.xpReward} XP
                                </Text>
                            </HStack>
                        </Box>
                    </Pressable>
                ))}
            </VStack>
        </VStack>
    );
};
