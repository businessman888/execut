import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from '../ui';
import { Image as RNImage } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface HabitItemProps {
    title: string;
    image?: any;
    isCompleted?: boolean;
    onToggle?: () => void;
}

// Checkbox circle
const CheckboxCircle: React.FC<{ isChecked: boolean }> = ({ isChecked }) => (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
        <Circle
            cx={14}
            cy={14}
            r={13}
            stroke={isChecked ? '#33CFFF' : '#4B5563'}
            strokeWidth={1.5}
            fill={isChecked ? '#33CFFF' : 'transparent'}
        />
        {isChecked && (
            <Svg width={28} height={28} viewBox="0 0 28 28">
                <Circle cx={14} cy={14} r={4} fill="#0D0D0D" />
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
                w={341}
                h={66}
                borderRadius={15}
                borderWidth={1}
                borderColor="white"
                overflow="hidden"
                position="relative"
            >
                {/* Background Image */}
                {image && (
                    <RNImage
                        source={image}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                    />
                )}

                {/* Gradient Overlay - Darker for visibility */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="black"
                    opacity={0.6}
                />

                {/* Content */}
                <HStack
                    flex={1}
                    alignItems="center"
                    justifyContent="space-between"
                    px={5}
                    zIndex={1}
                >
                    <Text
                        color="white"
                        fontSize="md"
                        fontWeight="semibold"
                        numberOfLines={1}
                        style={{ flex: 1, marginRight: 16 }}
                    >
                        {title}
                    </Text>
                    <CheckboxCircle isChecked={isCompleted} />
                </HStack>
            </Box>
        </Pressable>
    );
};
