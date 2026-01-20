import { Box, HStack, Text, Pressable, ScrollView } from 'native-base';
import Svg, { Circle } from 'react-native-svg';
import { CheckBlueIcon } from '../icons/NavIcons';

interface MilestoneChip {
    id: string;
    label: string;
    isActive?: boolean;
}

interface MilestoneChipsProps {
    milestones: MilestoneChip[];
    onChipPress?: (id: string) => void;
    onViewAllPress?: () => void;
}

export const MilestoneChips: React.FC<MilestoneChipsProps> = ({
    milestones,
    onChipPress,
    onViewAllPress,
}) => {
    return (
        <Box>
            {/* Header */}
            <HStack justifyContent="space-between" alignItems="center" mb={3}>
                <Text color="text.primary" fontSize="md" fontWeight="semibold">
                    Marcos Principais
                </Text>
                <Pressable onPress={onViewAllPress}>
                    <Text color="accent.400" fontSize="sm">
                        Ver tudo
                    </Text>
                </Pressable>
            </HStack>

            {/* Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space={2}>
                    {milestones.map((milestone) => (
                        <Pressable
                            key={milestone.id}
                            onPress={() => onChipPress?.(milestone.id)}
                        >
                            <Box
                                bg={milestone.isActive ? 'transparent' : 'transparent'}
                                borderRadius="full"
                                borderWidth={1}
                                borderColor={milestone.isActive ? 'accent.400' : 'border.default'}
                                px={3}
                                py={2}
                            >
                                <HStack space={2} alignItems="center">
                                    {/* Circle indicator */}
                                    {milestone.isActive ? (
                                        <CheckBlueIcon size={16} />
                                    ) : (
                                        <Svg width={16} height={16} viewBox="0 0 16 16">
                                            <Circle
                                                cx={8}
                                                cy={8}
                                                r={6}
                                                stroke="#6B7280"
                                                strokeWidth={1.5}
                                                fill="none"
                                            />
                                        </Svg>
                                    )}
                                    <Text
                                        color={milestone.isActive ? 'accent.400' : 'text.secondary'}
                                        fontSize="sm"
                                    >
                                        {milestone.label}
                                    </Text>
                                </HStack>
                            </Box>
                        </Pressable>
                    ))}
                </HStack>
            </ScrollView>
        </Box>
    );
};
