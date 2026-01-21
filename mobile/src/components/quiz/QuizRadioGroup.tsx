import React from 'react';
import { Box, Text, VStack, HStack, Pressable } from '../ui';
import { Svg, Path, Rect, Circle, Line, G } from 'react-native-svg';

interface RadioOption {
    value: string;
    label: string;
    description: string;
    icon: 'briefcase' | 'arrows' | 'rocket' | 'person' | 'chart';
}

interface QuizRadioGroupProps {
    options: RadioOption[];
    value: string | undefined;
    onChange: (value: string) => void;
}

// Icon components
const BriefcaseIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Box w={size} h={size} alignItems="center" justifyContent="center">
        <Text color={color} fontSize="md">💼</Text>
    </Box>
);

const ArrowsIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Box w={size} h={size} alignItems="center" justifyContent="center">
        <Text color={color} fontSize="md">↔️</Text>
    </Box>
);

const RocketIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Box w={size} h={size} alignItems="center" justifyContent="center">
        <Text color={color} fontSize="md">🚀</Text>
    </Box>
);

const PersonIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Box w={size} h={size} alignItems="center" justifyContent="center">
        <Text color={color} fontSize="md">👤</Text>
    </Box>
);

const ChartIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Box w={size} h={size} alignItems="center" justifyContent="center">
        <Text color={color} fontSize="md">📊</Text>
    </Box>
);

const getIcon = (iconName: string, isSelected: boolean) => {
    const color = isSelected ? '#33CFFF' : '#9CA3AF';

    switch (iconName) {
        case 'briefcase':
            return <BriefcaseIcon color={color} />;
        case 'arrows':
            return <ArrowsIcon color={color} />;
        case 'rocket':
            return <RocketIcon color={color} />;
        case 'person':
            return <PersonIcon color={color} />;
        case 'chart':
            return <ChartIcon color={color} />;
        default:
            return <BriefcaseIcon color={color} />;
    }
};

export const QuizRadioGroup: React.FC<QuizRadioGroupProps> = ({
    options,
    value,
    onChange,
}) => {
    return (
        <VStack space={2}>
            {options.map((option) => {
                const isSelected = value === option.value;

                return (
                    <Pressable
                        key={option.value}
                        onPress={() => onChange(option.value)}
                    >
                        <Box
                            bg={isSelected ? 'surface.secondary' : 'surface.primary'}
                            borderWidth={1}
                            borderColor={isSelected ? 'accent.400' : 'border.subtle'}
                            borderRadius={12}
                            px={4}
                            py={3}
                        >
                            <HStack alignItems="center" justifyContent="space-between">
                                <HStack space={3} alignItems="center" flex={1}>
                                    {/* Icon */}
                                    <Box
                                        w={40}
                                        h={40}
                                        borderRadius={10}
                                        bg={isSelected ? 'rgba(51, 207, 255, 0.15)' : 'surface.tertiary'}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        {getIcon(option.icon, isSelected)}
                                    </Box>

                                    {/* Text content */}
                                    <VStack flex={1} space={0}>
                                        <Text
                                            color={isSelected ? 'accent.400' : 'text.primary'}
                                            fontSize="md"
                                            fontWeight="600"
                                        >
                                            {option.label}
                                        </Text>
                                        <Text
                                            color="text.tertiary"
                                            fontSize="xs"
                                            numberOfLines={2}
                                        >
                                            {option.description}
                                        </Text>
                                    </VStack>
                                </HStack>

                                {/* Radio circle */}
                                <Box
                                    w={22}
                                    h={22}
                                    borderRadius={11}
                                    borderWidth={2}
                                    borderColor={isSelected ? 'accent.400' : 'border.default'}
                                    alignItems="center"
                                    justifyContent="center"
                                    ml={2}
                                >
                                    {isSelected && (
                                        <Box
                                            w={12}
                                            h={12}
                                            borderRadius={6}
                                            bg="accent.400"
                                        />
                                    )}
                                </Box>
                            </HStack>
                        </Box>
                    </Pressable>
                );
            })}
        </VStack>
    );
};
