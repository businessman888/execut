import React from 'react';
import { Box, HStack, VStack, Text, Pressable, Image } from 'native-base';
import Svg, { Circle } from 'react-native-svg';

interface HabitItemProps {
    title: string;
    image?: string;
    isCompleted?: boolean;
    onToggle?: () => void;
}

// Checkbox circle
const CheckboxCircle: React.FC<{ isChecked: boolean }> = ({ isChecked }) => (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
        <Circle
            cx={20}
            cy={20}
            r={18}
            stroke={isChecked ? '#33CFFF' : '#4B5563'}
            strokeWidth={2}
            fill={isChecked ? '#33CFFF' : 'transparent'}
        />
        {isChecked && (
            <Svg width={40} height={40} viewBox="0 0 40 40">
                <Circle cx={20} cy={20} r={6} fill="#0D0D0D" />
            </Svg>
        )}
    </Svg>
);

export const HabitItem: React.FC<HabitItemProps> = ({
    title,
    image,
    isCompleted = false,
    onToggle,
}) => {
    return (
        <Pressable onPress={onToggle}>
            <Box
                borderRadius="2xl"
                overflow="hidden"
                h={14}
                position="relative"
            >
                {/* Background Image */}
                {image && (
                    <Image
                        source={{ uri: image }}
                        alt={title}
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        resizeMode="cover"
                        opacity={0.4}
                    />
                )}

                {/* Gradient Overlay */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={image ? 'transparent' : 'surface.primary'}
                    style={{
                        backgroundColor: image ? 'rgba(13, 13, 13, 0.7)' : undefined,
                    }}
                />

                {/* Content */}
                <HStack
                    flex={1}
                    alignItems="center"
                    justifyContent="space-between"
                    px={4}
                >
                    <Text
                        color="text.primary"
                        fontSize="md"
                        fontWeight="semibold"
                    >
                        {title}
                    </Text>
                    <CheckboxCircle isChecked={isCompleted} />
                </HStack>
            </Box>
        </Pressable>
    );
};
