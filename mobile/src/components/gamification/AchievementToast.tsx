import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { HStack, VStack, Text, Box } from '../ui';
import Svg, { Path } from 'react-native-svg';

interface AchievementToastProps {
    visible: boolean;
    title: string;
    iconSlug: string;
    onDismiss: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Achievement icons by slug
const AchievementIcon = ({ slug, size = 28 }: { slug: string; size?: number }) => {
    const color = '#33CFFF';
    switch (slug) {
        case 'rocket':
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2L16 10H8L12 2Z" fill={color} />
                    <Path d="M12 10V22M8 14L4 18M16 14L20 18" stroke={color} strokeWidth={2} strokeLinecap="round" />
                </Svg>
            );
        case 'flame':
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2C12 2 5 10 5 15C5 18.866 8.134 22 12 22C15.866 22 19 18.866 19 15C19 10 12 2 12 2Z" fill={color} />
                </Svg>
            );
        case 'shield':
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2L3 7V12C3 17.5 7.8 22.7 12 23C16.2 22.7 21 17.5 21 12V7L12 2Z" fill={color} />
                </Svg>
            );
        case 'crown':
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path d="M2 17L4 7L8 11L12 4L16 11L20 7L22 17H2Z" fill={color} />
                </Svg>
            );
        case 'eye':
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" fill={color} />
                    <Path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#0D0D0D" />
                </Svg>
            );
        default:
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={color} />
                </Svg>
            );
    }
};

export const AchievementToast: React.FC<AchievementToastProps> = ({
    visible,
    title,
    iconSlug,
    onDismiss,
}) => {
    const translateY = useRef(new Animated.Value(-120)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Slide in from top
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 60,
                    friction: 8,
                    tension: 60,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto dismiss after 4s
            const timer = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: -120,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ]).start(() => onDismiss());
            }, 4000);

            return () => clearTimeout(timer);
        } else {
            translateY.setValue(-120);
            opacity.setValue(0);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.toast,
                {
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <HStack
                space={3}
                alignItems="center"
                bg="#1A1A1A"
                borderRadius={16}
                borderWidth={1}
                borderColor="rgba(51, 207, 255, 0.4)"
                px={4}
                py={3}
            >
                <Box
                    w={44}
                    h={44}
                    borderRadius={12}
                    bg="rgba(51, 207, 255, 0.15)"
                    alignItems="center"
                    justifyContent="center"
                >
                    <AchievementIcon slug={iconSlug} />
                </Box>
                <VStack style={{ flex: 1 }}>
                    <Text color="#33CFFF" fontSize={11} fontWeight="bold" letterSpacing={1}>
                        CONQUISTA DESBLOQUEADA
                    </Text>
                    <Text color="#FFFFFF" fontSize={15} fontWeight="600">
                        {title}
                    </Text>
                    <Text color="#9CA3AF" fontSize={12}>
                        +500 XP
                    </Text>
                </VStack>
            </HStack>
        </Animated.View>
    );
};

export { AchievementIcon };

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 0,
        left: 16,
        right: 16,
        zIndex: 9999,
    },
});
