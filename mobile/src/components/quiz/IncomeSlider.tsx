import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Dimensions, PanResponder, Animated, View } from 'react-native';
import { Box, VStack, HStack, Text } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';

interface IncomeSliderProps {
    value: any;
    onChange: (value: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_PADDING = 32;
const SLIDER_WIDTH = SCREEN_WIDTH - SLIDER_PADDING * 2 - 32;
const THUMB_SIZE = 32;

// Income / cash icon
const IncomeIcon = ({ size = 20, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth={2} />
        <Path d="M2 10H22" stroke={color} strokeWidth={2} />
        <Path
            d="M12 15C12 15 14 14.2 14 13C14 11.5 12 11.5 12 11.5C12 11.5 10 11.5 10 13C10 14.2 12 15 12 15Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
    </Svg>
);

// Snap points for monthly income
const SNAP_POINTS = [
    { value: 0, label: 'R$ 0', shortLabel: '0' },
    { value: 10000, label: 'R$ 10 mil', shortLabel: '10k' },
    { value: 20000, label: 'R$ 20 mil', shortLabel: '20k' },
    { value: 50000, label: 'R$ 50 mil', shortLabel: '50k' },
    { value: 100000, label: 'R$ 100 mil', shortLabel: '100k' },
    { value: 300000, label: 'R$ 300 mil', shortLabel: '300k' },
    { value: 500000, label: 'R$ 500 mil', shortLabel: '500k' },
    { value: 1000000, label: 'R$ 1 mi', shortLabel: '1M' },
    { value: 5000000, label: 'R$ 5 mi', shortLabel: '5M' },
    { value: 10000000, label: 'R$ 10 mi', shortLabel: '10M' },
];

function getDescription(value: number): string {
    if (value === 0) return 'Defina sua meta de renda';
    if (value <= 10000) return 'Renda confortável';
    if (value <= 20000) return 'Renda alta';
    if (value <= 50000) return 'Renda muito alta';
    if (value <= 100000) return 'Renda excepcional 🔥';
    if (value <= 300000) return 'Top 0.1% 🚀';
    if (value <= 500000) return 'Mentalidade de magnata 👑';
    if (value <= 1000000) return 'Clube do milhão/mês 💎';
    return 'Visão de império 💎👑';
}

export const IncomeSlider: React.FC<IncomeSliderProps> = ({
    value = 0,
    onChange,
}) => {
    const [currentSnapIndex, setCurrentSnapIndex] = useState(() => {
        const num = typeof value === 'number' ? value : parseInt(value, 10) || 0;
        const idx = SNAP_POINTS.findIndex((sp) => sp.value >= num);
        return idx >= 0 ? idx : 0;
    });

    // Ref to track current index (avoids stale closure in PanResponder)
    const snapIndexRef = useRef(currentSnapIndex);

    const displayValue = SNAP_POINTS[currentSnapIndex].value;
    const displayLabel = SNAP_POINTS[currentSnapIndex].label;

    const animatedPosition = useRef(
        new Animated.Value((currentSnapIndex / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH)
    ).current;

    const snapToIndex = useCallback(
        (index: number) => {
            const clampedIndex = Math.max(0, Math.min(SNAP_POINTS.length - 1, index));
            setCurrentSnapIndex(clampedIndex);
            snapIndexRef.current = clampedIndex;

            Animated.spring(animatedPosition, {
                toValue: (clampedIndex / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH,
                friction: 8,
                tension: 100,
                useNativeDriver: false,
            }).start();

            onChange(SNAP_POINTS[clampedIndex].value.toString());
        },
        [onChange]
    );

    const snapToIndexRef = useRef(snapToIndex);
    snapToIndexRef.current = snapToIndex;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => { },
            onPanResponderMove: (_, gestureState) => {
                const startPos = (snapIndexRef.current / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH;
                const rawPosition = Math.max(
                    0,
                    Math.min(SLIDER_WIDTH, startPos + gestureState.dx)
                );
                animatedPosition.setValue(rawPosition);
            },
            onPanResponderRelease: (_, gestureState) => {
                const startPos = (snapIndexRef.current / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH;
                const rawPosition = startPos + gestureState.dx;
                const fraction = Math.max(0, Math.min(1, rawPosition / SLIDER_WIDTH));
                const nearestIndex = Math.round(fraction * (SNAP_POINTS.length - 1));
                snapToIndexRef.current(nearestIndex);
            },
        })
    ).current;

    const progressWidth = animatedPosition.interpolate({
        inputRange: [0, SLIDER_WIDTH],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    return (
        <VStack space={6} alignItems="center" w="100%" px={4}>
            {/* Current Value Display */}
            <Box
                bg="rgba(51, 207, 255, 0.08)"
                borderRadius={20}
                borderWidth={1}
                borderColor="rgba(51, 207, 255, 0.25)"
                px={6}
                py={4}
                alignItems="center"
                w="100%"
            >
                <HStack space={3} alignItems="center">
                    <Box
                        w={44}
                        h={44}
                        borderRadius={22}
                        bg="rgba(51, 207, 255, 0.15)"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <IncomeIcon size={22} />
                    </Box>
                    <VStack>
                        <Text color="#9CA3AF" fontSize={11} letterSpacing={1}>
                            RENDA MENSAL DESEJADA
                        </Text>
                        <Text color="#33CFFF" fontSize={28} fontWeight="bold">
                            {displayLabel}
                        </Text>
                        <Text color="#6B7280" fontSize={12}>
                            {getDescription(displayValue)}/mês
                        </Text>
                    </VStack>
                </HStack>
            </Box>

            {/* Slider Track */}
            <Box w="100%" px={2}>
                <View
                    style={styles.trackContainer}
                    {...panResponder.panHandlers}
                >
                    {/* Background Track */}
                    <View style={styles.track}>
                        <Animated.View style={[styles.trackFill, { width: progressWidth }]}>
                            <LinearGradient
                                colors={['#33CFFF', '#1A8FBF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={StyleSheet.absoluteFillObject}
                            />
                        </Animated.View>
                    </View>

                    {/* Snap point dots */}
                    {SNAP_POINTS.map((sp, i) => {
                        const dotLeft = (i / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH;
                        const isActive = i <= currentSnapIndex;
                        return (
                            <View
                                key={sp.value}
                                style={[
                                    styles.snapDot,
                                    {
                                        left: dotLeft - 3,
                                        backgroundColor: isActive
                                            ? '#33CFFF'
                                            : 'rgba(107, 114, 128, 0.4)',
                                    },
                                ]}
                            />
                        );
                    })}

                    {/* Thumb */}
                    <Animated.View
                        style={[
                            styles.thumb,
                            {
                                transform: [
                                    {
                                        translateX: animatedPosition.interpolate({
                                            inputRange: [0, SLIDER_WIDTH],
                                            outputRange: [
                                                -THUMB_SIZE / 2,
                                                SLIDER_WIDTH - THUMB_SIZE / 2,
                                            ],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <LinearGradient
                            colors={['#33CFFF', '#1A8FBF']}
                            style={styles.thumbGradient}
                        />
                    </Animated.View>
                </View>

                {/* Scale Labels — show select labels to avoid clutter */}
                <HStack justifyContent="space-between" mt={3} px={0}>
                    {SNAP_POINTS.filter((_, i) => i % 3 === 0 || i === SNAP_POINTS.length - 1).map((sp) => (
                        <Text
                            key={sp.value}
                            color={sp.value === displayValue ? '#33CFFF' : '#6B728050'}
                            fontSize={9}
                            fontWeight={sp.value === displayValue ? 'bold' : 'normal'}
                            textAlign="center"
                        >
                            {sp.shortLabel}
                        </Text>
                    ))}
                </HStack>
            </Box>
        </VStack>
    );
};

const styles = StyleSheet.create({
    trackContainer: {
        height: 48,
        justifyContent: 'center',
        position: 'relative',
    },
    track: {
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
        overflow: 'hidden',
    },
    trackFill: {
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
    },
    snapDot: {
        position: 'absolute',
        top: '50%',
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: -3,
    },
    thumb: {
        position: 'absolute',
        top: '50%',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        marginTop: -THUMB_SIZE / 2,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#33CFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    thumbGradient: {
        flex: 1,
    },
});
