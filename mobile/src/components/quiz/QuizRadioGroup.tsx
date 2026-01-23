import React from 'react';
import { Box, Text, VStack, HStack, Pressable } from '../ui';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

interface RadioOption {
    value: string;
    label: string;
    description: string;
    icon: 'briefcase' | 'arrows' | 'rocket' | 'person' | 'chart' | 'helpCircle' | 'close' | 'pulse' | 'flame' | 'fireTruck' | 'brain' | 'construct' | 'checkmarkDone' | 'phonePortrait' | 'hourglass' | 'notifications' | 'people' | 'thumbsUp' | 'thumbsDown' | 'wallet' | 'map' | 'alert' | 'time' | 'search' | 'warning' | 'reload' | 'trendingDown' | 'remove' | 'eyeOff' | 'git-branch' | 'cloudy' | 'cash' | 'megaphone' | 'analytics' | 'colorPalette' | 'checkmark' | 'globe';
}

interface QuizRadioGroupProps {
    options: RadioOption[];
    value: string | undefined;
    onChange: (value: string) => void;
}

// Icon components using @expo/vector-icons
const BriefcaseIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Ionicons name="briefcase" size={size} color={color} />
);

const ArrowsIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <MaterialCommunityIcons name="swap-horizontal" size={size} color={color} />
);

const RocketIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Ionicons name="rocket" size={size} color={color} />
);

const PersonIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Ionicons name="person" size={size} color={color} />
);

const ChartIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
    <Ionicons name="bar-chart" size={size} color={color} />
);

const getIcon = (iconName: string, isSelected: boolean) => {
    const color = isSelected ? '#33CFFF' : '#9CA3AF';

    switch (iconName) {
        case 'briefcase':
            return <Ionicons name="briefcase" size={20} color={color} />;
        case 'arrows':
            return <MaterialCommunityIcons name="swap-horizontal" size={20} color={color} />;
        case 'rocket':
            return <Ionicons name="rocket" size={20} color={color} />;
        case 'person':
            return <Ionicons name="person" size={20} color={color} />;
        case 'chart':
            return <Ionicons name="bar-chart" size={20} color={color} />;
        case 'helpCircle':
            return <Ionicons name="help-circle" size={20} color={color} />;
        case 'close':
            return <Ionicons name="close" size={20} color={color} />;
        case 'pulse':
            return <Ionicons name="pulse" size={20} color={color} />;
        case 'flame':
            return <Ionicons name="flame" size={20} color={color} />;
        case 'fireTruck':
            return <MaterialCommunityIcons name="fire-truck" size={20} color={color} />;
        case 'brain':
            return <MaterialCommunityIcons name="brain" size={20} color={color} />;
        case 'construct':
            return <Ionicons name="construct" size={20} color={color} />;
        case 'checkmarkDone':
            return <Ionicons name="checkmark-done" size={20} color={color} />;
        case 'phonePortrait':
            return <Ionicons name="phone-portrait" size={20} color={color} />;
        case 'hourglass':
            return <Ionicons name="hourglass" size={20} color={color} />;
        case 'notifications':
            return <Ionicons name="notifications" size={20} color={color} />;
        case 'people':
            return <Ionicons name="people" size={20} color={color} />;
        case 'thumbsUp':
            return <Ionicons name="thumbs-up" size={20} color={color} />;
        case 'thumbsDown':
            return <Ionicons name="thumbs-down" size={20} color={color} />;
        case 'wallet':
            return <Ionicons name="wallet" size={20} color={color} />;
        case 'map':
            return <Ionicons name="map" size={20} color={color} />;
        case 'alert':
            return <Ionicons name="alert-circle" size={20} color={color} />;
        case 'time':
            return <Ionicons name="time" size={20} color={color} />;
        case 'search':
            return <Ionicons name="search" size={20} color={color} />;
        case 'warning':
            return <Ionicons name="warning" size={20} color={color} />;
        case 'reload':
            return <Ionicons name="reload" size={20} color={color} />;
        case 'trendingDown':
            return <Ionicons name="trending-down" size={20} color={color} />;
        case 'remove':
            return <Ionicons name="remove-circle" size={20} color={color} />;
        case 'eyeOff':
            return <Ionicons name="eye-off" size={20} color={color} />;
        case 'git-branch':
            return <Ionicons name="git-branch" size={20} color={color} />;
        case 'cloudy':
            return <Ionicons name="cloudy" size={20} color={color} />;
        case 'cash':
            return <Ionicons name="cash" size={20} color={color} />;
        case 'megaphone':
            return <Ionicons name="megaphone" size={20} color={color} />;
        case 'analytics':
            return <Ionicons name="analytics" size={20} color={color} />;
        case 'colorPalette':
            return <Ionicons name="color-palette" size={20} color={color} />;
        case 'checkmark':
            return <Ionicons name="checkmark" size={20} color={color} />;
        case 'globe':
            return <Ionicons name="globe" size={20} color={color} />;
        default:
            return <Ionicons name="briefcase" size={20} color={color} />;
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
