import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import Svg, { Path, Circle, Rect, G, Mask } from 'react-native-svg';

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

// Checkmark icon based on "check marcos recentes.svg"
// Visually: Outer ring (fill 20% opacity, stroke) + Inner Cyan Circle with 'cutout' checkmark (simulated with black stroke)
const CheckmarkIcon = ({ size = 31 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 31 31" fill="none">
        <Rect x="0.5" y="0.5" width="30" height="30" rx="15" fill="#00C3FF" fillOpacity="0.2" />
        <Rect x="0.5" y="0.5" width="30" height="30" rx="15" stroke="#33CFFF" />
        <Circle cx="15.5" cy="15.5" r="8.75" fill="#33CFFF" />
        <Path
            d="M12 15.5L14.625 18.125L19.875 12.875"
            stroke="#0D0D0D" // Matches card background to simulate transparency/cutout
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
                            borderColor="#33CFFF"
                            width="343px"
                            height="73px"
                            p={4}
                            justifyContent="center"
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <HStack space={3} alignItems="center" flex={1}>
                                    <CheckmarkIcon size={31} />
                                    <VStack flex={1}>
                                        <Text color="text.primary" fontSize="sm" fontWeight="medium" numberOfLines={1}>
                                            {milestone.title}
                                        </Text>
                                        <Text color="text.tertiary" fontSize="xs">
                                            {milestone.completedAt}
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Text color="#33CFFF" fontSize="md" fontWeight="bold">
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
